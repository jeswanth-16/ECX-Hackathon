import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { sendConfirmationEmailViaResend } from './server/emailService.ts'
import { isEmailAlreadySent, updateFirestoreEmailStatus } from './server/firebaseAdmin.ts'

function emailDevServerPlugin(): Plugin {
  let env: Record<string, string> = {}

  return {
    name: 'email-dev-server',
    configResolved(config) {
      env = loadEnv(config.mode, process.cwd(), '')
      // Make loaded variables accessible to server-side helpers via process.env
      for (const [k, v] of Object.entries(env)) {
        if (!process.env[k]) {
          process.env[k] = v
        }
      }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/send-confirmation-email' && req.method === 'POST') {
          let rawBody = ''
          req.on('data', (chunk) => {
            rawBody += chunk
          })
          req.on('end', async () => {
            res.setHeader('Content-Type', 'application/json')
            try {
              const body = JSON.parse(rawBody || '{}')
              const registrationId = String(body.registrationId || body.id || '').trim()
              const teamName = String(body.teamName || '').trim()
              const teamLeaderName = String(body.teamLeaderName || body.leaderName || '').trim()
              const leaderEmail = String(body.leaderEmail || body.email || '').trim()
              const college = String(body.college || body.collegeName || 'Engineering Institution').trim()
              const status = String(body.status || 'Pending Review').trim()
              const domain = String(body.domain || body.problemDomain || '').trim()
              const members = Array.isArray(body.members) ? body.members : []

              // Required fields validation (Requirement 7)
              if (!registrationId || !teamName || !teamLeaderName || !leaderEmail) {
                res.statusCode = 400
                res.end(
                  JSON.stringify({
                    success: false,
                    error: 'Missing required registration fields: registrationId, teamName, teamLeaderName, and leaderEmail are mandatory.',
                  })
                )
                return
              }

              // Prevent duplicate email sends where possible (Requirement 15)
              const alreadySent = await isEmailAlreadySent(registrationId)
              if (alreadySent) {
                console.log(`[Vite Email Server] Confirmation email already sent for ${registrationId}. Skipping duplicate dispatch.`)
                res.statusCode = 200
                res.end(JSON.stringify({ success: true, message: 'Email already sent previously', alreadySent: true }))
                return
              }

              const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY
              if (!apiKey) {
                console.warn('[Vite Email Server] RESEND_API_KEY not found in .env.local or environment.')
                await updateFirestoreEmailStatus({
                  registrationId,
                  status: 'failed',
                  error: 'RESEND_API_KEY not configured on server',
                })
                res.statusCode = 500
                res.end(JSON.stringify({ success: false, error: 'RESEND_API_KEY not configured on server' }))
                return
              }

              const sender = env.SENDER_EMAIL || process.env.SENDER_EMAIL || 'ECX Hackathon 2026 <onboarding@resend.dev>'
              const baseUrl = env.VITE_PUBLIC_BASE_URL || 'http://localhost:5173'

              console.log(`[Vite Email Server] Dispatching registration confirmation to: ${leaderEmail} (${registrationId})`)

              const result = await sendConfirmationEmailViaResend({
                apiKey,
                sender,
                to: leaderEmail,
                data: {
                  registrationId,
                  teamName,
                  teamLeaderName,
                  college,
                  status,
                  domain,
                  members,
                },
                baseUrl,
              })

              console.log(`[Vite Email Server] Confirmation email delivered! Resend ID: ${result.id}`)

              // Securely update Firestore registration document: emailStatus = "sent", emailSentAt = timestamp (Requirement 5)
              await updateFirestoreEmailStatus({
                registrationId,
                status: 'sent',
              })

              res.statusCode = 200
              res.end(JSON.stringify({ success: true, emailId: result.id }))
            } catch (err: any) {
              const errorMessage = err?.message || 'Server error while dispatching email'
              console.error('[Vite Email Server] Failed to dispatch email stack:', err?.stack || err)

              // Securely update Firestore registration document: emailStatus = "failed", emailError = error message (Requirement 6)
              try {
                const body = JSON.parse(rawBody || '{}')
                if (body.registrationId) {
                  await updateFirestoreEmailStatus({
                    registrationId: body.registrationId,
                    status: 'failed',
                    error: errorMessage,
                  })
                }
              } catch {
                // Ignore parse errors on failure cleanup
              }

              res.statusCode = 500
              res.end(JSON.stringify({ success: false, error: errorMessage, stack: err?.stack }))
            }
          })
          return
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), emailDevServerPlugin()],
  server: {
    watch: {
      ignored: ['**/.agents/**', '**/.git/**', '**/server/**'],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/')
          ) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-icons'
          }
          if (id.includes('node_modules/qrcode/')) {
            return 'vendor-qr'
          }
        },
      },
    },
  },
})

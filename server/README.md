# ECX Hackathon 2026 — Standalone Email Backend

A lightweight, secure server-side email microservice for dispatching registration confirmation emails via **Resend**.

> **100% Free Deployment — Zero Firebase Cloud Functions — Zero Blaze/Credit Card Required**

---

## ⚡ How It Works

1. During local development, the Vite dev server (`npm run dev`) automatically handles `POST /api/send-confirmation-email` without needing a second terminal or extra process.
2. In production, this standalone Node.js Express server can be deployed to any free hosting provider (or run as a serverless function via `api/send-confirmation-email.js` on Vercel/Netlify).

---

## 🚀 Free Production Deployment Options

### Option 1: Render (100% Free Web Service)
1. Push this repository to GitHub.
2. Go to [Render.com](https://render.com/) and click **New > Web Service**.
3. Connect your repository.
4. Set:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
5. In **Environment Variables**, add:
   - `RESEND_API_KEY`: Your Resend API key (`re_...`)
   - `SENDER_EMAIL`: `ECX Hackathon 2026 <onboarding@resend.dev>` (or your verified domain)
   - `PUBLIC_BASE_URL`: `https://your-hackathon-site.web.app`

### Option 2: Vercel Serverless (Zero Config)
If deploying the frontend on Vercel, the file [`api/send-confirmation-email.js`](../api/send-confirmation-email.js) is automatically deployed as a serverless API function!
Just add `RESEND_API_KEY` in your Vercel Project Settings > Environment Variables.

### Option 3: Railway / Fly.io / VPS
Run `npm start` inside `server/` with `PORT` and `RESEND_API_KEY` configured in the environment.

---

## 🔒 Security
- `RESEND_API_KEY` is kept strictly on the server and is never prefixed with `VITE_`.
- The React/Vite browser bundle contains zero secret credentials.

import React from 'react';

export const AbstractTechVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[480px] aspect-square mx-auto flex items-center justify-center select-none pointer-events-none">
      {/* Background subtle technical glow */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-600/10 via-slate-800/10 to-transparent rounded-full blur-3xl" />
      
      {/* Outer engineering radar / circular track */}
      <div className="absolute inset-4 border border-slate-700/40 rounded-full border-dashed animate-[spin_80s_linear_infinite]" />
      <div className="absolute inset-14 border border-slate-800/60 rounded-full" />

      {/* Main SVG Circuit Artwork */}
      <svg
        className="w-full h-full relative z-10 filter drop-shadow-[0_0_15px_rgba(22,119,255,0.2)]"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="edge-trace-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
          <linearGradient id="edge-chip-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B132B" />
            <stop offset="100%" stopColor="#050811" />
          </linearGradient>
          <filter id="edge-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagonal Tech Frame */}
        <polygon
          points="200,30 350,115 350,285 200,370 50,285 50,115"
          stroke="#334155"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          fill="none"
          opacity="0.6"
        />

        {/* Circuit traces radiating outwards */}
        {/* Top-Right Circuit Traces */}
        <path d="M 230,170 L 290,110 L 330,110" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <circle cx="330" cy="110" r="3.5" fill="#38BDF8" filter="url(#edge-glow)" />
        <path d="M 230,185 L 310,185 L 340,155" stroke="#64748B" strokeWidth="1.5" opacity="0.7" />
        <circle cx="340" cy="155" r="3" fill="#64748B" />

        {/* Bottom-Right Traces */}
        <path d="M 230,215 L 280,265 L 330,265" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <circle cx="330" cy="265" r="3.5" fill="#38BDF8" />
        <path d="M 215,230 L 215,290 L 260,335" stroke="#64748B" strokeWidth="1.5" opacity="0.8" />
        <circle cx="260" cy="335" r="3" fill="#64748B" />

        {/* Bottom-Left Traces */}
        <path d="M 170,230 L 120,280 L 70,280" stroke="#38BDF8" strokeWidth="1.5" opacity="0.8" />
        <circle cx="70" cy="280" r="3.5" fill="#38BDF8" filter="url(#edge-glow)" />
        <path d="M 185,230 L 185,300 L 140,345" stroke="#64748B" strokeWidth="1.5" opacity="0.7" />
        <circle cx="140" cy="345" r="3" fill="#64748B" />

        {/* Top-Left Traces */}
        <path d="M 170,170 L 110,110 L 70,110" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <circle cx="70" cy="110" r="3" fill="#64748B" />
        <path d="M 185,170 L 185,90 L 140,55" stroke="#38BDF8" strokeWidth="1.5" opacity="0.8" />
        <circle cx="140" cy="55" r="3" fill="#38BDF8" />

        {/* PCB Bus lines */}
        <line x1="200" y1="50" x2="200" y2="130" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="200" y1="270" x2="200" y2="350" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="50" y1="200" x2="130" y2="200" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="270" y1="200" x2="350" y2="200" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Central Microprocessor / Neural Core Box */}
        <rect
          x="140"
          y="140"
          width="120"
          height="120"
          rx="12"
          fill="url(#edge-chip-grad)"
          stroke="#475569"
          strokeWidth="2"
        />

        {/* Chip Pins - Top & Bottom */}
        <g stroke="#38BDF8" strokeWidth="2" opacity="0.85">
          <line x1="160" y1="130" x2="160" y2="140" />
          <line x1="180" y1="130" x2="180" y2="140" />
          <line x1="200" y1="130" x2="200" y2="140" />
          <line x1="220" y1="130" x2="220" y2="140" />
          <line x1="240" y1="130" x2="240" y2="140" />

          <line x1="160" y1="260" x2="160" y2="270" />
          <line x1="180" y1="260" x2="180" y2="270" />
          <line x1="200" y1="260" x2="200" y2="270" />
          <line x1="220" y1="260" x2="220" y2="270" />
          <line x1="240" y1="260" x2="240" y2="270" />
        </g>

        {/* Chip Pins - Left & Right */}
        <g stroke="#64748B" strokeWidth="2" opacity="0.85">
          <line x1="130" y1="160" x2="140" y2="160" />
          <line x1="130" y1="180" x2="140" y2="180" />
          <line x1="130" y1="200" x2="140" y2="200" />
          <line x1="130" y1="220" x2="140" y2="220" />
          <line x1="130" y1="240" x2="140" y2="240" />

          <line x1="260" y1="160" x2="270" y2="160" />
          <line x1="260" y1="180" x2="270" y2="180" />
          <line x1="260" y1="200" x2="270" y2="200" />
          <line x1="260" y1="220" x2="270" y2="220" />
          <line x1="260" y1="240" x2="270" y2="240" />
        </g>

        {/* Inner Microprocessor Die */}
        <rect x="156" y="156" width="88" height="88" rx="8" fill="#030712" stroke="#1E293B" strokeWidth="1" />
        
        {/* Core IC Node */}
        <circle cx="200" cy="192" r="16" fill="url(#edge-trace-grad)" opacity="0.9" />
        
        {/* Central EDGECRAFT Branding */}
        <text
          x="200"
          y="196"
          textAnchor="middle"
          fontSize="8"
          fontWeight="800"
          letterSpacing="1.5"
          fill="#FFFFFF"
          fontFamily="JetBrains Mono, monospace"
        >
          EDGE
        </text>
        
        <text
          x="200"
          y="226"
          textAnchor="middle"
          fontSize="7"
          fontWeight="700"
          letterSpacing="1"
          fill="#94A3B8"
          fontFamily="JetBrains Mono, monospace"
        >
          2026 // HACK
        </text>

        {/* Corner alignment markers */}
        <circle cx="148" cy="148" r="1.5" fill="#38BDF8" />
        <circle cx="252" cy="148" r="1.5" fill="#38BDF8" />
        <circle cx="148" cy="252" r="1.5" fill="#38BDF8" />
        <circle cx="252" cy="252" r="1.5" fill="#38BDF8" />
      </svg>
    </div>
  );
};

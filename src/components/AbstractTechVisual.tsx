import React from 'react';

export const AbstractTechVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto flex items-center justify-center select-none pointer-events-none">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-electric-blue/20 via-electric-purple/20 to-electric-cyan/15 rounded-full blur-3xl animate-pulse-slow" />
      
      {/* Outer rotating decorative ring */}
      <div className="absolute inset-4 border border-blue-500/20 rounded-full border-dashed animate-[spin_60s_linear_infinite]" />
      <div className="absolute inset-12 border border-purple-500/25 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

      {/* Main SVG Circuit Artwork */}
      <svg
        className="w-full h-full relative z-10 filter drop-shadow-[0_0_20px_rgba(22,119,255,0.4)]"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cyber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1677FF" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>
          <linearGradient id="chip-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F1E36" />
            <stop offset="100%" stopColor="#07111F" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagonal Tech Frame */}
        <polygon
          points="200,30 350,115 350,285 200,370 50,285 50,115"
          stroke="url(#cyber-grad)"
          strokeWidth="1.5"
          strokeDasharray="8 4"
          fill="none"
          opacity="0.4"
        />

        {/* Circuit traces radiating outwards */}
        {/* Top-Right Circuit Traces */}
        <path d="M 230,170 L 290,110 L 330,110" stroke="#1677FF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <circle cx="330" cy="110" r="4" fill="#00F0FF" filter="url(#glow)" />
        <path d="M 230,185 L 310,185 L 340,155" stroke="#7C3AED" strokeWidth="1.5" opacity="0.7" />
        <circle cx="340" cy="155" r="3.5" fill="#7C3AED" />

        {/* Bottom-Right Traces */}
        <path d="M 230,215 L 280,265 L 330,265" stroke="#1677FF" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <circle cx="330" cy="265" r="4" fill="#1677FF" />
        <path d="M 215,230 L 215,290 L 260,335" stroke="#00F0FF" strokeWidth="1.5" opacity="0.8" />
        <circle cx="260" cy="335" r="3" fill="#00F0FF" />

        {/* Bottom-Left Traces */}
        <path d="M 170,230 L 120,280 L 70,280" stroke="#7C3AED" strokeWidth="2" opacity="0.8" />
        <circle cx="70" cy="280" r="4" fill="#7C3AED" filter="url(#glow)" />
        <path d="M 185,230 L 185,300 L 140,345" stroke="#1677FF" strokeWidth="1.5" opacity="0.7" />
        <circle cx="140" cy="345" r="3.5" fill="#1677FF" />

        {/* Top-Left Traces */}
        <path d="M 170,170 L 110,110 L 70,110" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <circle cx="70" cy="110" r="4" fill="#00F0FF" />
        <path d="M 185,170 L 185,90 L 140,55" stroke="#7C3AED" strokeWidth="1.5" opacity="0.8" />
        <circle cx="140" cy="55" r="3" fill="#7C3AED" />

        {/* Additional PCB bus lines */}
        <line x1="200" y1="50" x2="200" y2="130" stroke="#1677FF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
        <line x1="200" y1="270" x2="200" y2="350" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
        <line x1="50" y1="200" x2="130" y2="200" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
        <line x1="270" y1="200" x2="350" y2="200" stroke="#1677FF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />

        {/* Central Microprocessor / Neural Core Box */}
        <rect
          x="140"
          y="140"
          width="120"
          height="120"
          rx="18"
          fill="url(#chip-grad)"
          stroke="url(#cyber-grad)"
          strokeWidth="2.5"
          filter="url(#glow)"
        />

        {/* Chip Pins - Top & Bottom */}
        <g stroke="#1677FF" strokeWidth="2" opacity="0.9">
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
        <g stroke="#7C3AED" strokeWidth="2" opacity="0.9">
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

        {/* Inner Microprocessor Die & Logo */}
        <rect x="156" y="156" width="88" height="88" rx="10" fill="#030712" stroke="#1E293B" strokeWidth="1" />
        
        {/* Core Node Pulse */}
        <circle cx="200" cy="200" r="24" fill="url(#cyber-grad)" opacity="0.2" className="animate-ping" style={{ animationDuration: '3s' }} />
        <circle cx="200" cy="200" r="18" fill="url(#cyber-grad)" opacity="0.8" />
        
        {/* Central ECX Tech Symbol */}
        <text
          x="200"
          y="205"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          letterSpacing="1"
          fill="#FFFFFF"
          fontFamily="Inter, sans-serif"
        >
          ECX
        </text>

        {/* Corner alignment markers */}
        <circle cx="148" cy="148" r="2" fill="#00F0FF" />
        <circle cx="252" cy="148" r="2" fill="#00F0FF" />
        <circle cx="148" cy="252" r="2" fill="#00F0FF" />
        <circle cx="252" cy="252" r="2" fill="#00F0FF" />

        {/* Dynamic floating data packets */}
        <circle cx="290" cy="110" r="2" fill="#FFFFFF" className="animate-pulse" />
        <circle cx="120" cy="280" r="2" fill="#FFFFFF" className="animate-pulse" />
        <circle cx="185" cy="90" r="2" fill="#FFFFFF" className="animate-pulse" />
        <circle cx="215" cy="290" r="2" fill="#FFFFFF" className="animate-pulse" />
      </svg>
    </div>
  );
};

import React from 'react';

const SlasaLogo = ({ className = "h-12 w-auto" }: { className?: string }) => {
  return (
    <svg viewBox="0 0 600 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Definitions for Gradients */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6B21A8" /> {/* Purple */}
          <stop offset="25%" stopColor="#EF4444" /> {/* Red */}
          <stop offset="50%" stopColor="#F59E0B" /> {/* Orange */}
          <stop offset="75%" stopColor="#10B981" /> {/* Green */}
          <stop offset="100%" stopColor="#3B82F6" /> {/* Blue */}
        </linearGradient>
      </defs>

      {/* Main Text: SLASA */}
      <g transform="translate(140, 160)">
        <text x="0" y="0" fill="#6B21A8" fontSize="100" fontWeight="900" fontFamily="Inter, sans-serif" letterSpacing="-2">S</text>
        <text x="65" y="0" fill="#EF4444" fontSize="100" fontWeight="900" fontFamily="Inter, sans-serif" letterSpacing="-2">L</text>
        <text x="125" y="0" fill="#F59E0B" fontSize="100" fontWeight="900" fontFamily="Inter, sans-serif" letterSpacing="-2">A</text>
        <text x="200" y="0" fill="#10B981" fontSize="100" fontWeight="900" fontFamily="Inter, sans-serif" letterSpacing="-2">S</text>
        <text x="265" y="0" fill="#3B82F6" fontSize="100" fontWeight="900" fontFamily="Inter, sans-serif" letterSpacing="-2">A</text>
      </g>

      {/* Subtitle: TUITION CENTRE */}
      <text x="300" y="210" textAnchor="middle" fill="#4B5563" fontSize="28" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="2">TUITION CENTRE</text>

      {/* Elliptical Swoosh */}
      <path 
        d="M120 230 C 80 180, 150 100, 300 80 C 450 60, 520 120, 480 180" 
        stroke="url(#logoGradient)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        fill="none"
        opacity="0.8"
      />
      <path 
        d="M120 230 C 140 250, 200 260, 300 260 C 400 260, 460 250, 480 230" 
        stroke="url(#logoGradient)" 
        strokeWidth="4" 
        strokeLinecap="round" 
        fill="none"
        opacity="0.5"
      />

      {/* Star at the top right of the swoosh */}
      <path 
        d="M480 80 L485 95 L500 100 L485 105 L480 120 L475 105 L460 100 L475 95 Z" 
        fill="#F59E0B" 
        className="animate-pulse"
      />

      {/* Colorful Dots at the bottom */}
      <circle cx="240" cy="245" r="6" fill="#6B21A8" />
      <circle cx="270" cy="245" r="6" fill="#EF4444" />
      <circle cx="300" cy="245" r="6" fill="#F59E0B" />
      <circle cx="330" cy="245" r="6" fill="#10B981" />
      <circle cx="360" cy="245" r="6" fill="#3B82F6" />
    </svg>
  );
};

export default SlasaLogo;

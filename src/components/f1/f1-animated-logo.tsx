"use client";

import { motion } from "motion/react";

export function F1AnimatedLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Animated Glowing Telemetry Track Line Drawing Around Logo */}
      <svg
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full drop-shadow-[0_0_25px_rgba(214,48,60,0.6)]"
      >
        {/* Track Line Path Sweep */}
        <motion.path
          d="M 20,100 L 100,20 L 300,20 L 380,100 L 300,180 L 100,180 Z"
          stroke="url(#trackGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], repeat: Infinity, repeatDelay: 3 }}
        />

        {/* F1 Negative Space Logo Vector */}
        <g transform="translate(60, 45) scale(1.4)">
          {/* Red F Body */}
          <path
            d="M 10 10 H 70 V 30 H 35 V 45 H 65 V 65 H 35 V 100 H 10 Z"
            fill="#D6303C"
          />

          {/* Speed Slashes forming negative space '1' */}
          <path
            d="M 75 10 L 95 10 L 70 100 L 50 100 Z"
            fill="#E35864"
            opacity="0.9"
          />

          <path
            d="M 100 10 L 120 10 L 95 100 L 75 100 Z"
            fill="#F4F5F6"
          />

          {/* Subtitle Telemetry Cutout */}
          <rect x="10" y="105" width="110" height="4" fill="#D6303C" />
        </g>

        <defs>
          <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D6303C" />
            <stop offset="50%" stopColor="#E35864" />
            <stop offset="100%" stopColor="#27F4D2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

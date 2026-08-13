"use client";

import { motion } from "motion/react";

interface F1LogoMarkProps {
  className?: string;
}

export function F1LogoMark({ className = "h-12 w-28" }: F1LogoMarkProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 320 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full object-contain"
        role="img"
        aria-label="Formula 1 Brand Logo"
      >
        {/* Forward-slanted F1 Logo Mark with Negative Space '1' */}
        <g>
          {/* Main Red 'F' Structure */}
          <motion.path
            d="M 40 100 L 80 15 H 180 L 170 38 H 105 L 98 56 H 155 L 145 78 H 90 L 80 100 H 40 Z"
            fill="#D6303C"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Upper Top Bar of 'F' */}
          <motion.path
            d="M 185 15 H 225 L 215 38 H 175 L 185 15 Z"
            fill="#D6303C"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          />

          {/* Negative Space Speed Slashes forming the '1' */}
          <motion.path
            d="M 200 15 L 220 15 L 182 100 L 162 100 Z"
            fill="#F4F5F6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          />

          <motion.path
            d="M 230 15 L 245 15 L 207 100 L 192 100 Z"
            fill="#F4F5F6"
            opacity="0.85"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          />

          <motion.path
            d="M 255 15 L 265 15 L 227 100 L 217 100 Z"
            fill="#8A8F94"
            opacity="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          />
        </g>
      </svg>
    </div>
  );
}

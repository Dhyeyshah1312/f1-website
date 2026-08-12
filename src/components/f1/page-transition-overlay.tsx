"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

export function PageTransitionOverlay() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <motion.div
          key={pathname}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-carbon/90 backdrop-blur-md"
        >
          {/* Top Telemetry Red Bar Sweep */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-1 w-full bg-gradient-to-r from-circuit-red via-circuit-red-highlight to-titanium shadow-[0_0_12px_#d6303c]"
          />

          {/* Center Monospace Route Indicator */}
          <div className="flex flex-col items-center justify-center gap-2 py-auto">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="font-mono text-xs uppercase tracking-widest text-circuit-red-highlight"
            >
              [ TELEMETRY SYNC ]
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="font-display text-2xl font-black uppercase tracking-wider text-titanium"
            >
              {pathname === "/" ? "DISCOVER" : pathname.replace("/", "").replace("-", " ")}
            </motion.span>
          </div>

          {/* Bottom Telemetry Red Bar Sweep */}
          <motion.div
            initial={{ scaleX: 0, originX: 1 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-0.5 w-full bg-asphalt"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

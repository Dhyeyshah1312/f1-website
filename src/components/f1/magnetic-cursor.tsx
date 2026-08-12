"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export function MagneticCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('a, button, [role="button"], [data-cursor], input, select');

      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute("data-cursor-text") || "";
        setCursorText(customText);
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none select-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Outer Telemetry Ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none select-none fixed left-0 top-0 z-50 flex items-center justify-center rounded-full border border-circuit-red/60 bg-circuit-red/10 shadow-[0_0_15px_rgba(214,48,60,0.3)] backdrop-blur-[1px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? (cursorText ? 64 : 44) : 28,
          height: isHovered ? (cursorText ? 64 : 44) : 28,
          borderColor: isHovered ? "rgba(227, 88, 100, 0.9)" : "rgba(214, 48, 60, 0.5)",
          backgroundColor: isHovered ? "rgba(214, 48, 60, 0.2)" : "rgba(214, 48, 60, 0.05)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pointer-events-none select-none font-mono text-[9px] font-bold uppercase tracking-widest text-titanium"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Precision Target Point */}
      <motion.div
        aria-hidden
        className="pointer-events-none select-none fixed left-0 top-0 z-50 h-1.5 w-1.5 rounded-full bg-circuit-red-highlight shadow-[0_0_8px_#e35864]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
    </div>
  );
}

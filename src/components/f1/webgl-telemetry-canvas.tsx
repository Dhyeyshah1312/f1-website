"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Pre-defined circuit curve splines (Monaco-inspired & Monza-inspired 3D closed loops)
function createCircuitSpline(scale = 1, offsetY = 0) {
  const points = [
    new THREE.Vector3(-6 * scale, 2 * scale + offsetY, 0),
    new THREE.Vector3(-3 * scale, 5 * scale + offsetY, -2),
    new THREE.Vector3(2 * scale, 4 * scale + offsetY, -4),
    new THREE.Vector3(6 * scale, 2 * scale + offsetY, -1),
    new THREE.Vector3(7 * scale, -2 * scale + offsetY, 1),
    new THREE.Vector3(4 * scale, -4 * scale + offsetY, 3),
    new THREE.Vector3(-1 * scale, -5 * scale + offsetY, 2),
    new THREE.Vector3(-5 * scale, -3 * scale + offsetY, 0),
    new THREE.Vector3(-6 * scale, 2 * scale + offsetY, 0),
  ];
  return new THREE.CatmullRomCurve3(points, true);
}

// Particle field & Circuit Light Trails Scene
function TelemetryScene({ scrollVelocityRef }: { scrollVelocityRef: React.RefObject<number> }) {
  const { mouse, viewport } = useThree();

  // Particle cloud
  const count = 1200;
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, originalPositions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const teamColors = [
      new THREE.Color("#d6303c"), // F1 Circuit Red
      new THREE.Color("#e35864"), // Red Highlight
      new THREE.Color("#ff8000"), // McLaren Papaya
      new THREE.Color("#27f4d2"), // Mercedes Teal
      new THREE.Color("#3671c6"), // Red Bull Navy
      new THREE.Color("#00665e"), // Aston Martin Green
      new THREE.Color("#64c4ff"), // Williams Blue
      new THREE.Color("#8a8f94"), // Steel
      new THREE.Color("#2a2d30"), // Asphalt
    ];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 20 - 5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      const rand = Math.random();
      let c = teamColors[8]; // Asphalt base
      if (rand > 0.90) c = teamColors[0]; // F1 Red
      else if (rand > 0.82) c = teamColors[2]; // Papaya
      else if (rand > 0.74) c = teamColors[3]; // Teal
      else if (rand > 0.66) c = teamColors[4]; // Red Bull Blue
      else if (rand > 0.58) c = teamColors[5]; // Racing Green
      else if (rand > 0.50) c = teamColors[6]; // Williams Blue
      else if (rand > 0.25) c = teamColors[7]; // Steel

      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }

    return { positions: pos, originalPositions: orig, colors: cols };
  }, []);

  // Circuit Splines & Trail Light Packets
  const splines = useMemo(() => [
    createCircuitSpline(1.2, 1),
    createCircuitSpline(0.8, -2),
  ], []);

  const trail1Ref = useRef<THREE.Mesh>(null);
  const trail2Ref = useRef<THREE.Mesh>(null);
  const lineGroupRef = useRef<THREE.Group>(null);

  const t1Progress = useRef(0);
  const t2Progress = useRef(0.5);

  useFrame((state, delta) => {
    // Clamped delta for low-end safety
    const safeDelta = Math.min(delta, 0.05);
    const scrollVel = Math.abs(scrollVelocityRef.current || 0);

    // Parallax mouse target
    const targetX = (mouse.x * viewport.width) / 12;
    const targetY = (mouse.y * viewport.height) / 12;

    if (pointsRef.current) {
      const positionAttr = pointsRef.current.geometry.attributes.position;
      const posArray = positionAttr.array as Float32Array;

      // Particle float & scroll warp
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const time = state.clock.getElapsedTime();
        const offset = i * 0.1;
        
        const origX = originalPositions[i3];
        const origY = originalPositions[i3 + 1];
        const origZ = originalPositions[i3 + 2];

        // Cursor magnetic push
        const dx = origX - targetX;
        const dy = origY - targetY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 1 - dist / 6) * 0.4;

        posArray[i3] = origX + Math.sin(time + offset) * 0.15 + (dx / (dist || 1)) * force;
        posArray[i3 + 1] = origY + Math.cos(time * 0.8 + offset) * 0.15 + (dy / (dist || 1)) * force;

        // Scroll Z speed warp
        if (scrollVel > 0.1) {
          posArray[i3 + 2] = origZ + Math.sin(time * 3 + offset) * (scrollVel * 0.05);
        } else {
          posArray[i3 + 2] = THREE.MathUtils.lerp(posArray[i3 + 2], origZ, safeDelta * 3);
        }
      }
      positionAttr.needsUpdate = true;

      // Slowly rotate particle field
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, mouse.x * 0.1, safeDelta * 2);
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -mouse.y * 0.1, safeDelta * 2);
    }

    // Move light trail pulses along circuit curves
    if (splines.length >= 2) {
      const speed1 = (0.08 + scrollVel * 0.002) * safeDelta;
      const speed2 = (0.06 + scrollVel * 0.002) * safeDelta;

      t1Progress.current = (t1Progress.current + speed1) % 1;
      t2Progress.current = (t2Progress.current + speed2) % 1;

      if (trail1Ref.current) {
        const pt1 = splines[0].getPointAt(t1Progress.current);
        trail1Ref.current.position.copy(pt1);
      }

      if (trail2Ref.current) {
        const pt2 = splines[1].getPointAt(t2Progress.current);
        trail2Ref.current.position.copy(pt2);
      }
    }

    if (lineGroupRef.current) {
      lineGroupRef.current.rotation.y = THREE.MathUtils.lerp(lineGroupRef.current.rotation.y, mouse.x * 0.05, safeDelta * 2);
      lineGroupRef.current.rotation.x = THREE.MathUtils.lerp(lineGroupRef.current.rotation.x, -mouse.y * 0.05, safeDelta * 2);
    }
  });

  // Build THREE.Line instances safely to avoid JSX SVG element collision
  const lineObjects = useMemo(() => {
    return splines.map((spline, idx) => {
      const points = spline.getPoints(120);
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: idx === 0 ? "#17191b" : "#2a2d30",
        transparent: true,
        opacity: 0.3,
      });
      return new THREE.Line(geom, mat);
    });
  }, [splines]);

  return (
    <>
      {/* Dynamic Telemetry Particle Cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* 3D Glowing Track Splines */}
      <group ref={lineGroupRef} position={[0, 0, -4]}>
        {lineObjects.map((lineObj, idx) => (
          <primitive key={idx} object={lineObj} />
        ))}

        {/* Trail pulse 1 (glowing red telemetry node) */}
        <mesh ref={trail1Ref}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshBasicMaterial color="#d6303c" transparent opacity={0.9} />
        </mesh>

        {/* Trail pulse 2 (glowing white telemetry node) */}
        <mesh ref={trail2Ref}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshBasicMaterial color="#e35864" transparent opacity={0.8} />
        </mesh>
      </group>
    </>
  );
}

export function WebGLTelemetryCanvas() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const scrollVelocityRef = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);

    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollVelocityRef.current = currentY - lastScrollY.current;
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!mounted || reducedMotion) {
    return (
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-graphite/40 via-carbon to-carbon opacity-60" 
        aria-hidden="true" 
      />
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <TelemetryScene scrollVelocityRef={scrollVelocityRef} />
      </Canvas>
    </div>
  );
}

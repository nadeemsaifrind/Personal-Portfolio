"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const BRAND = "#06b48d";
const BRAND_DEEP = "#02745c";
const GRAPHITE = "#171c22";

/* Floating graphite product-render with a green rim light. Reads on a light page. */
function Core({ reduce }: { reduce: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current || reduce) return;
    group.current.rotation.y += delta * 0.16;
    group.current.rotation.x += delta * 0.04;
    const px = state.pointer.x * 0.4;
    const py = state.pointer.y * 0.28;
    group.current.position.x += (px - group.current.position.x) * 0.04;
    group.current.position.y += (py - group.current.position.y) * 0.04;
  });

  return (
    <group ref={group} scale={0.95}>
      <Float
        speed={reduce ? 0 : 1.1}
        rotationIntensity={reduce ? 0 : 0.35}
        floatIntensity={reduce ? 0 : 0.7}
      >
        <Icosahedron args={[1.45, 18]}>
          <MeshDistortMaterial
            color={GRAPHITE}
            emissive={BRAND_DEEP}
            emissiveIntensity={0.12}
            roughness={0.22}
            metalness={0.92}
            distort={reduce ? 0 : 0.3}
            speed={reduce ? 0 : 1.1}
            clearcoat={1}
            clearcoatRoughness={0.2}
          />
        </Icosahedron>
        <Icosahedron args={[1.9, 1]}>
          <meshBasicMaterial color={BRAND} wireframe transparent opacity={0.28} />
        </Icosahedron>
        <Icosahedron args={[2.3, 2]}>
          <meshBasicMaterial color={BRAND} wireframe transparent opacity={0.08} />
        </Icosahedron>
      </Float>
    </group>
  );
}

function Particles({ count, reduce }: { count: number; reduce: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.2 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current && !reduce) ref.current.rotation.y -= delta * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={BRAND}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function Hero3D() {
  const reduce = useReducedMotion() ?? false;
  const [count, setCount] = useState(200);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) setCount(100);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.7]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-6, -2, -4]} intensity={2.6} color={BRAND} />
      <pointLight position={[5, -4, 3]} intensity={1.2} color="#0a3d31" />
      <Core reduce={reduce} />
      <Particles count={count} reduce={reduce} />
    </Canvas>
  );
}

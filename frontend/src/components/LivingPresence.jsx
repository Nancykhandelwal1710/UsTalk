import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const modeConfig = {
  talk: {
    color: "#f4c7a1",
    glow: "#e99b72",
  },

  vent: {
    color: "#d88b91",
    glow: "#a94f5c",
  },

  learn: {
    color: "#9bb9d9",
    glow: "#6389b8",
  },

  advice: {
    color: "#e5b77a",
    glow: "#c88445",
  },

  fun: {
    color: "#f3a37f",
    glow: "#e86e52",
  },

  someone: {
    color: "#e6a5b8",
    glow: "#bd637f",
  },
};

function LivingCore({ mode }) {
  const core = useRef();
  const glow = useRef();

  const config = modeConfig[mode] || modeConfig.talk;

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (!core.current) return;

    // Natural breathing
    const breathe =
      1 +
      Math.sin(time * 1.15) * 0.045 +
      Math.sin(time * 0.55) * 0.02;

    core.current.scale.set(
      breathe,
      1 + Math.sin(time * 1.3) * 0.055,
      breathe
    );

    // Very subtle floating
    core.current.position.y =
      Math.sin(time * 0.7) * 0.055;

    // Organic rotation
    core.current.rotation.x =
      Math.sin(time * 0.3) * 0.08;

    core.current.rotation.y =
      time * 0.08;

    // Glow breathing
    if (glow.current) {
      const glowScale =
        1.05 + Math.sin(time * 1.15) * 0.07;

      glow.current.scale.setScalar(glowScale);
    }
  });

  return (
    <group>
      {/* Soft light */}
      <ambientLight intensity={0.5} />

      <pointLight
        position={[2, 1, 3]}
        intensity={4}
        distance={5}
        color={config.glow}
      />

      <pointLight
        position={[-2, -1, 2]}
        intensity={2}
        distance={4}
        color={config.color}
      />

      {/* Outer soft glow */}
      <mesh ref={glow} scale={1.1}>
        <sphereGeometry args={[0.9, 48, 48]} />

        <meshBasicMaterial
          color={config.glow}
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Main presence */}
      <mesh ref={core}>
        <sphereGeometry args={[0.85, 64, 64]} />

        <meshPhysicalMaterial
          color={config.color}
          emissive={config.glow}
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.05}
          transmission={0.35}
          thickness={1.4}
          transparent
          opacity={0.94}
        />
      </mesh>

      {/* Inner light */}
      <mesh scale={0.62}>
        <sphereGeometry args={[0.85, 48, 48]} />

        <meshBasicMaterial
          color={config.color}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function LivingPresence({ mode }) {
  return (
    <div className="living-presence">
      <Canvas
        camera={{
          position: [0, 0, 4],
          fov: 38,
        }}
        dpr={[1, 2]}
      >
        <LivingCore mode={mode} />
      </Canvas>
    </div>
  );
}

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Cone, Ring, Circle, Box, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

interface ConductorProps {
  direction: 1 | -1;
  showLabels?: boolean;
}

// Helper component for the wire ends (Cross-section view)
const EndCap: React.FC<{ type: 'dot' | 'cross'; position: [number, number, number]; rotation: [number, number, number] }> = ({ type, position, rotation }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Outer Red Ring */}
      <Ring args={[0.18, 0.22, 32]}>
        <meshStandardMaterial color="#ef4444" side={THREE.DoubleSide} />
      </Ring>

      {/* Inner Grey Background */}
      <Circle args={[0.18, 32]}>
        <meshStandardMaterial color="#64748b" side={THREE.DoubleSide} />
      </Circle>

      {/* The Symbol (Dot or Cross) */}
      {type === 'dot' ? (
        // Dot Symbol
        <Circle args={[0.08, 32]} position={[0, 0, 0.001]}>
          <meshBasicMaterial color="black" />
        </Circle>
      ) : (
        // Cross Symbol (X)
        <group position={[0, 0, 0.001]}>
          <Box args={[0.25, 0.06, 0.001]} rotation={[0, 0, Math.PI / 4]}>
             <meshBasicMaterial color="black" />
          </Box>
          <Box args={[0.25, 0.06, 0.001]} rotation={[0, 0, -Math.PI / 4]}>
             <meshBasicMaterial color="black" />
          </Box>
        </group>
      )}
    </group>
  );
};

export const Conductor: React.FC<ConductorProps> = ({ direction, showLabels }) => {
  const arrowGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (arrowGroupRef.current) {
      // Floating animation along the wire to indicate flow
      // Using a modulo to make it loop smoothly along a small section
      const t = state.clock.getElapsedTime();
      arrowGroupRef.current.position.y = (t % 1.5) * 2 * direction - (1 * direction);
    }
  });

  const wireHeight = 10; // Slightly shorter (was 12)
  const wireRadius = 0.04; // Very thin radius to look like a line
  const capOffset = wireHeight / 2;

  return (
    <group>
      {/* The Wire (Thin Line representation) */}
      <Cylinder args={[wireRadius, wireRadius, wireHeight, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial
            color="#94a3b8"
            emissive="#94a3b8"
            emissiveIntensity={0.3}
            metalness={0.5}
            roughness={0.5}
        />
      </Cylinder>

      {/* Current Direction Arrow (Centered on/in the wire) */}
      <group ref={arrowGroupRef}>
        <group rotation={[direction === -1 ? Math.PI : 0, 0, 0]}>
            {/* Shaft of the arrow */}
            <Cylinder args={[0.08, 0.08, 1.2, 12]} position={[0, -0.6, 0]}>
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} />
            </Cylinder>
            {/* Head of the arrow */}
            <Cone args={[0.2, 0.5, 32]} position={[0, 0.25, 0]}>
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} />
            </Cone>

            {/* Label I */}
            {showLabels && (
              <Billboard position={[0.4, -0.2, 0]}>
                <Text
                  fontSize={0.6}
                  color="#ef4444"
                  fontStyle="italic"
                  anchorX="center"
                  anchorY="middle"
                >
                  I
                </Text>
              </Billboard>
            )}
        </group>
      </group>

      {/* Top Cap (Visible when looking down) */}
      {/* If current is UP (1), it comes OUT (Dot). If DOWN (-1), it goes IN (Cross). */}
      <EndCap
        type={direction === 1 ? 'dot' : 'cross'}
        position={[0, capOffset, 0]}
        rotation={[-Math.PI / 2, 0, 0]} // Face Up
      />

      {/* Bottom Cap (Visible when looking up) */}
      {/* If current is UP (1), it moves AWAY from bottom viewer (Cross). If DOWN (-1), it comes TOWARDS bottom viewer (Dot). */}
      <EndCap
        type={direction === 1 ? 'cross' : 'dot'}
        position={[0, -capOffset, 0]}
        rotation={[Math.PI / 2, 0, 0]} // Face Down
      />
    </group>
  );
};

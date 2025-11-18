import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';

interface FieldLinesProps {
  showLines: boolean;
  showDirection: boolean;
  currentDirection: 1 | -1;
  showLabels?: boolean;
}

const FIELD_COLOR = "#3b82f6"; // Blue color for B-field

export const FieldLines: React.FC<FieldLinesProps> = ({ showLines, showDirection, currentDirection, showLabels }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Radii for concentric circles
  const radii = [1.2, 2.2, 3.2, 4.2];
  const arrowsPerRing = 8;

  // Define the flat arrow shape (2D)
  // Defined in XY plane with Tip pointing +Y
  const arrowShape = useMemo(() => {
    const s = new THREE.Shape();
    const width = 0.15;
    const length = 0.4;

    // Draw an arrow pointing "Up" (Y-axis in 2D shape space)
    s.moveTo(0, length);      // Tip
    s.lineTo(width, 0);       // Bottom Right
    s.lineTo(0, 0.1);         // Bottom Center (indented notch)
    s.lineTo(-width, 0);      // Bottom Left
    s.lineTo(0, length);      // Close loop to Tip

    return s;
  }, []);

  useFrame((state) => {
    if (groupRef.current && showLines) {
      // Slowly rotate the field lines for visual flair
      // Positive rotation for Up (CCW), Negative for Down (CW)
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1 * currentDirection;
    }
  });

  if (!showLines) return null;

  return (
    <group ref={groupRef}>
      {radii.map((radius, i) => (
        <Torus key={`ring-${i}`} args={[radius, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
              color={FIELD_COLOR}
              emissive={FIELD_COLOR}
              emissiveIntensity={0.5}
              transparent
              opacity={0.4}
          />
        </Torus>
      ))}

      {/* Flat 2D Arrows for Field Direction */}
      {showDirection && radii.map((radius, ringIdx) => (
          <group key={`arrows-group-${ringIdx}`}>
              {Array.from({ length: arrowsPerRing }).map((_, arrowIdx) => {
                  const angle = (arrowIdx / arrowsPerRing) * Math.PI * 2;
                  const x = Math.cos(angle) * radius;
                  const z = Math.sin(angle) * radius;

                  // Rotation Logic:
                  // 1. Inner Mesh is rotated X by 90deg (PI/2). This makes the arrow (originally Y-up) point along Z-axis and lie flat.
                  // 2. Outer Group is rotated Y to align that Z-axis with the tangent of the circle.

                  // Tangent Calculation (Reversed from previous version to match CCW requirement):
                  // If Current UP (1) -> Field is CCW -> Rotation = Math.PI - angle
                  // If Current DOWN (-1) -> Field is CW -> Rotation = -angle
                  const rotationY = currentDirection === 1 ? Math.PI - angle : -angle;

                  // Show Label on the 2nd ring (index 1), first arrow (index 0)
                  const isLabelArrow = ringIdx === 1 && arrowIdx === 0;

                  return (
                      <group
                        key={`arrow-container-${ringIdx}-${arrowIdx}`}
                        position={[x, 0, z]}
                        rotation={[0, rotationY, 0]}
                      >
                          {/* Rotate Shape so it lies flat and points along local Z */}
                          <mesh rotation={[Math.PI / 2, 0, 0]}>
                              <shapeGeometry args={[arrowShape]} />
                              <meshStandardMaterial
                                color={FIELD_COLOR}
                                emissive="#60a5fa"
                                emissiveIntensity={0.8}
                                side={THREE.DoubleSide}
                                roughness={0.2}
                              />
                          </mesh>

                          {/* B Label attached to this specific arrow */}
                          {showLabels && isLabelArrow && (
                             <Billboard position={[0, 0.5, 0]}>
                                <Text
                                    fontSize={0.6}
                                    color={FIELD_COLOR}
                                    fontStyle="italic"
                                    anchorX="center"
                                    anchorY="bottom"
                                >
                                    B
                                </Text>
                             </Billboard>
                          )}
                      </group>
                  )
              })}
          </group>
      ))}

      {/* Fallback: If arrows are hidden but labels are shown, show 'B' floating on the ring */}
      {showLabels && !showDirection && (
        <group position={[radii[1], 0, 0]}>
             <Billboard position={[0, 0.3, 0]}>
                <Text
                    fontSize={0.6}
                    color={FIELD_COLOR}
                    fontStyle="italic"
                    anchorX="center"
                    anchorY="bottom"
                >
                    B
                </Text>
             </Billboard>
        </group>
      )}
    </group>
  );
};

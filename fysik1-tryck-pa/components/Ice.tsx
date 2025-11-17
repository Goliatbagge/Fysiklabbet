import React, { useMemo } from 'react';
import { Plane, Circle } from '@react-three/drei';
import * as THREE from 'three';

interface IceProps {
  isBroken: boolean;
  pressure: number;
  breakingPoint: number;
  area: number;
}

const Ice: React.FC<IceProps> = ({ isBroken, pressure, breakingPoint, area }) => {

  const holeRadius = useMemo(() => Math.sqrt(area / Math.PI), [area]);

  const cracksTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    const size = 512;
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    if (!context) return new THREE.CanvasTexture(canvas);

    context.strokeStyle = 'rgba(0, 10, 20, 1)';
    context.lineWidth = 1.5;
    context.lineCap = 'round';

    const centerX = size / 2;
    const centerY = size / 2;

    for (let i = 0; i < 8; i++) {
        let angle = (i / 8) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
        // Reduced the length of cracks to keep them tighter around the hole
        let len1 = size / 5 + Math.random() * size / 10;
        let ex1 = centerX + Math.cos(angle) * len1;
        let ey1 = centerY + Math.sin(angle) * len1;
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.lineTo(ex1, ey1);
        context.stroke();

        let angle2 = angle + (Math.random() - 0.5) * 0.8;
        let len2 = len1 * (Math.random() * 0.3 + 0.2);
        let ex2 = ex1 + Math.cos(angle2) * len2;
        let ey2 = ey1 + Math.sin(angle2) * len2;
        context.beginPath();
        context.moveTo(ex1, ey1);
        context.lineTo(ex2, ey2);
        context.stroke();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  const cracksOpacity = useMemo(() => {
    if (isBroken) return 0.8;
    const pressureRatio = pressure / breakingPoint;
    if (pressureRatio < 0.7) return 0;
    // Map pressure ratio from [0.7, 1.0] to opacity [0, 0.8]
    const opacity = ((pressureRatio - 0.7) / 0.3) * 0.8;
    return Math.min(Math.max(opacity, 0), 0.8);
  }, [pressure, breakingPoint, isBroken]);

  return (
    <group>
      {/* Main ice surface */}
      <Plane
        args={[20, 20]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#e0f2fe"
          opacity={0.85}
          transparent // Required for opacity
          roughness={0.1}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </Plane>

      {/* Cracks are rendered on a transparent circular plane slightly above the ice */}
      <Circle
        args={[3, 64]} // Radius 3 (6 diameter), 64 segments for a smooth edge
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
      >
          <meshStandardMaterial
            map={cracksTexture}
            transparent={true}
            opacity={cracksOpacity}
            alphaTest={0.1}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
      </Circle>

      {/* Black hole that appears when the ice is broken */}
      {isBroken && (
        <Circle
          args={[holeRadius, 32]} // Hole radius now matches the cylinder's base
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.02, 0]} // Positioned slightly above the cracks
        >
          <meshBasicMaterial color="black" />
        </Circle>
      )}
    </group>
  );
};

export default Ice;

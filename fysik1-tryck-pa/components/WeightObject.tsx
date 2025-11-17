import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MIN_FORCE, MAX_FORCE } from '../constants';

interface WeightObjectProps {
  area: number;
  isBroken: boolean;
  force: number;
}

const MIN_CYLINDER_HEIGHT = 0.5;
const MAX_CYLINDER_HEIGHT = 4.0;

const WeightObject: React.FC<WeightObjectProps> = ({ area, isBroken, force }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  const height = useMemo(() => {
    const forceRatio = (force - MIN_FORCE) / (MAX_FORCE - MIN_FORCE);
    return MIN_CYLINDER_HEIGHT + forceRatio * (MAX_CYLINDER_HEIGHT - MIN_CYLINDER_HEIGHT);
  }, [force]);

  const radius = useMemo(() => Math.sqrt(area / Math.PI), [area]);

  useFrame((state, delta) => {
    if (isBroken && meshRef.current.position.y > -10) {
      // Animate falling down
      meshRef.current.position.y -= 9.8 * delta * 2; // A bit of gravity
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, height / 2, 0]} castShadow>
      <cylinderGeometry args={[radius, radius, height, 32]} />
      <meshStandardMaterial color="#f97316" roughness={0.3} metalness={0.8} />
    </mesh>
  );
};

export default WeightObject;

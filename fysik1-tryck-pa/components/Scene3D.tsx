import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';
import WeightObject from './WeightObject';
import Ice from './Ice';

// Helper component for loading state
const Loader: React.FC = () => {
    return (
      <Text
        position={[0, 0, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Laddar 3D-scen...
      </Text>
    );
}


interface Scene3DProps {
  area: number;
  force: number;
  isBroken: boolean;
  pressure: number;
  breakingPoint: number;
}

const Scene3D: React.FC<Scene3DProps> = ({ area, force, isBroken, pressure, breakingPoint }) => {
  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 50 }}
      shadows
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Environment preset="sunset" />

        <WeightObject area={area} isBroken={isBroken} force={force} />
        <Ice area={area} isBroken={isBroken} pressure={pressure} breakingPoint={breakingPoint} />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={20}
        />
      </Suspense>
    </Canvas>
  );
};

export default Scene3D;

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, ContactShadows } from '@react-three/drei';
import { Conductor } from './Conductor';
import { FieldLines } from './FieldLines';
import { SimulationState } from '../types';

export const Scene: React.FC<SimulationState> = (props) => {
  return (
    <Canvas
      shadows
      camera={{ position: [6, 4, 8], fov: 45 }}
      className="w-full h-full bg-slate-900"
    >
      <color attach="background" args={['#0f172a']} />

      {/* Environmental Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Scene Content - Centered at (0,0,0) for symmetrical camera views */}
      <group>
        <Conductor
          direction={props.currentDirection}
          showLabels={props.showLabels}
        />
        <FieldLines
            showLines={props.showFieldLines}
            showDirection={props.showFieldDirection}
            currentDirection={props.currentDirection}
            showLabels={props.showLabels}
        />

        <ContactShadows opacity={0.4} scale={20} blur={2} far={10} resolution={256} color="#000000" />
      </group>

      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        minDistance={2}
        maxDistance={20}
      />
    </Canvas>
  );
};

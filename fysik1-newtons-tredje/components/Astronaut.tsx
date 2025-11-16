import React from 'react';
import { AstronautState } from '../types';

interface AstronautProps {
  state: AstronautState;
}

const Astronaut: React.FC<AstronautProps> = ({ state }) => {
  return (
    <div
      className="absolute w-20 h-20"
      style={{
        left: state.position.x,
        top: state.position.y,
        transform: `translate(-50%, -50%) rotate(${state.rotation}deg)`,
        willChange: 'transform, top, left',
      }}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="astronaut-group">
          {/* Fire extinguisher */}
          <rect x="75" y="42" width="25" height="16" rx="4" fill="#E53E3E"/>
          <rect x="98" y="47" width="7" height="6" fill="#A0AEC0"/>

          {/* Body */}
          <rect x="25" y="30" width="55" height="40" rx="20" fill="#EDF2F7"/>

          {/* Helmet */}
          <circle cx="28" cy="50" r="22" fill="#E2E8F0"/>
          <circle cx="28" cy="50" r="16" fill="#2D3748"/>
          <path d="M20 45 C 25 38, 35 38, 40 45" stroke="#718096" strokeWidth="2" strokeLinecap="round"/>

          {/* Backpack */}
          <rect x="55" y="25" width="20" height="50" rx="8" fill="#A0AEC0"/>

          {/* Legs */}
          <rect x="35" y="70" width="15" height="20" rx="7.5" fill="#EDF2F7"/>
          <rect x="55" y="70" width="15" height="20" rx="7.5" fill="#EDF2F7"/>

          {/* Arms */}
          <rect x="35" y="10" width="15" height="20" rx="7.5" fill="#EDF2F7"/>
          <rect x="55" y="10" width="15" height="20" rx="7.5" fill="#EDF2F7"/>
        </g>
      </svg>
    </div>
  );
};

export default Astronaut;

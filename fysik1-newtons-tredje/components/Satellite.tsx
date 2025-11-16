import React from 'react';
import { SatelliteState } from '../types';

interface SatelliteProps {
  state: SatelliteState;
}

const Satellite: React.FC<SatelliteProps> = ({ state }) => {
  return (
    <div
      className="absolute"
      style={{
        left: state.position.x,
        top: state.position.y,
        width: '200px',
        height: '200px',
        transform: `translate(-50%, -50%) rotate(${state.rotation}deg)`,
        willChange: 'transform, top, left',
      }}
    >
      {/*
        The local coordinate system for the SVG and the physics engine starts at the top-left of the main gray body.
        The viewBox is adjusted to center the satellite visually.
      */}
      <svg viewBox="-40 -70 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          {/* Main Body with Docking Port Cutout */}
          <path d="M0,0 L100,0 L100,25 L130,25 L130,65 L100,65 L100,90 L0,90 Z" fill="#9CA3AF" stroke="#6B7280" strokeWidth="2"/>

          {/* Docking Port Inner - The dark opening */}
          <rect x="100" y="25" width="30" height="40" fill="#111827" />

          {/* The actual "door" or hatch ring */}
          <circle cx="115" cy="45" r="15" fill="none" stroke="#FBBF24" strokeWidth="3" />

          {/* Guiding lights */}
          <circle cx="105" cy="20" r="2" fill="#F87171" />
          <circle cx="130" cy="20" r="2" fill="#F87171" />
          <circle cx="105" cy="70" r="2" fill="#F87171" />
          <circle cx="130" cy="70" r="2" fill="#F87171" />

          {/* Details on body */}
          <rect x="10" y="10" width="80" height="15" rx="3" fill="#6B7280" />
          <rect x="10" y="65" width="80" height="15" rx="3" fill="#6B7280" />
          <circle cx="50" cy="45" r="12" fill="#6B7280" />

          {/* Solar Panels (Top and Bottom) */}
          <rect x="30" y="-60" width="40" height="60" fill="#3B82F6" rx="4" />
          <rect x="30" y="90" width="40" height="60" fill="#3B82F6" rx="4" />
          <rect x="32" y="-58" width="36" height="56" fill="#60A5FA" rx="2" />
          <rect x="32" y="92" width="36" height="56" fill="#60A5FA" rx="2" />
        </g>
      </svg>
    </div>
  );
};

export default Satellite;

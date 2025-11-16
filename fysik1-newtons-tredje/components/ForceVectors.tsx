import React from 'react';
import { Vector2D } from '../types';

interface ForceVectorsProps {
  isSpraying: boolean;
  astronautPosition: Vector2D;
  targetPosition: Vector2D;
}

const MAX_VECTOR_LENGTH = 150;
const VECTOR_OFFSET = 50; // To start the vector slightly away from the astronaut center

const ForceVectors: React.FC<ForceVectorsProps> = ({ isSpraying, astronautPosition, targetPosition }) => {
  if (!isSpraying) {
    return null;
  }

  const dx = targetPosition.x - astronautPosition.x;
  const dy = targetPosition.y - astronautPosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angleRad = Math.atan2(dy, dx);
  const angleDeg = angleRad * (180 / Math.PI);

  const length = Math.min(distance - VECTOR_OFFSET, MAX_VECTOR_LENGTH);

  if (length <= 0) {
    return null;
  }

  const vectorBaseStyle: React.CSSProperties = {
    position: 'absolute',
    height: '4px',
    transformOrigin: 'left center',
  };

  const labelBaseStyle: React.CSSProperties = {
      position: 'absolute',
      bottom: '8px',
      transform: 'translateX(-50%)',
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
  }

  return (
    <div className="absolute pointer-events-none" style={{ top: astronautPosition.y, left: astronautPosition.x, willChange: 'transform' }}>
        {/* Action Vector (Spray) */}
        <div style={{ transform: `rotate(${angleDeg}deg)` }} className="absolute">
            <div style={{...vectorBaseStyle, left: `${VECTOR_OFFSET}px`, width: `${length}px` }} className="bg-cyan-400 rounded-full">
                 <div style={{...labelBaseStyle, left: `${length / 2}px` }} className="bg-cyan-400 text-black">
                    Aktion
                </div>
                {/* Arrowhead */}
                <div
                    style={{ position: 'absolute', right: '-2px', top: '50%', transform: 'translateY(-50%)' }}
                    className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-cyan-400"
                />
            </div>
        </div>

        {/* Reaction Vector (Thrust) */}
        <div style={{ transform: `rotate(${angleDeg + 180}deg)` }} className="absolute">
             <div style={{...vectorBaseStyle, left: `${VECTOR_OFFSET}px`, width: `${length}px` }} className="bg-red-500 rounded-full">
                <div style={{...labelBaseStyle, left: `${length / 2}px`}} className="bg-red-500 text-white">
                    Reaktion
                </div>
                 {/* Arrowhead */}
                <div
                    style={{ position: 'absolute', right: '-2px', top: '50%', transform: 'translateY(-50%)' }}
                    className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-red-500"
                />
             </div>
        </div>
    </div>
  );
};

export default ForceVectors;

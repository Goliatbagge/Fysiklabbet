import React, { useMemo } from 'react';

interface Star {
  id: number;
  x: string;
  y: string;
  size: string;
  opacity: string;
}

const Starfield: React.FC<{ starCount?: number }> = ({ starCount = 200 }) => {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      opacity: `${Math.random() * 0.5 + 0.2}`,
    }));
  }, [starCount]);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            top: star.y,
            left: star.x,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default Starfield;

import React, { useState, useRef, useCallback, useMemo } from 'react';

interface SimulationViewProps {
  n1: number;
  n2: number;
  incidentAngle: number;
  setIncidentAngle: (angle: number) => void;
}

export const SimulationView: React.FC<SimulationViewProps> = ({ n1, n2, incidentAngle, setIncidentAngle }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const VIEWBOX_WIDTH = 800;
  const VIEWBOX_HEIGHT = 600;
  const BLOCK_Y = 200;
  const BLOCK_HEIGHT = 200;
  const ENTRY_X = VIEWBOX_WIDTH / 2;
  const RAY_LENGTH = 250;

  const calculations = useMemo(() => {
    const theta1Rad = incidentAngle * (Math.PI / 180);
    const sinTheta2 = (n1 / n2) * Math.sin(theta1Rad);
    const isTIR = n1 > n2 && Math.abs(sinTheta2) > 1;
    const theta2Rad = isTIR ? 0 : -Math.asin(sinTheta2);

    // Incident ray starts at p1 and goes to p2.
    const p1 = {
      x: ENTRY_X + RAY_LENGTH * Math.sin(theta1Rad),
      y: BLOCK_Y - RAY_LENGTH * Math.cos(theta1Rad)
    };
    const p2 = { x: ENTRY_X, y: BLOCK_Y };

    let p3, p4;

    if (isTIR) {
      // Total internal reflection. Angle of reflection equals angle of incidence.
      p3 = {
        x: ENTRY_X - RAY_LENGTH * Math.sin(theta1Rad),
        y: BLOCK_Y - RAY_LENGTH * Math.cos(theta1Rad)
      };
      p4 = p3; // No ray exits the block.
    } else {
      // Refracted ray.
      const internalDx = BLOCK_HEIGHT * Math.tan(theta2Rad);
      p3 = { x: ENTRY_X + internalDx, y: BLOCK_Y + BLOCK_HEIGHT };

      // Exiting ray. Should be parallel to the incident ray.
      p4 = {
        x: p3.x - RAY_LENGTH * Math.sin(theta1Rad),
        y: p3.y + RAY_LENGTH * Math.cos(theta1Rad)
      };
    }

    return { p1, p2, p3, p4, theta1Rad, theta2Rad, isTIR };
  }, [incidentAngle, n1, n2]);

  const { p1, p2, p3, p4, theta1Rad, theta2Rad, isTIR } = calculations;

  const handleInteraction = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();

    let clientX, clientY;
    if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    const x = (clientX - rect.left) * (VIEWBOX_WIDTH / rect.width);
    const y = (clientY - rect.top) * (VIEWBOX_HEIGHT / rect.height);

    const dx = x - p2.x;
    const dy = y - p2.y;

    if (dy >= 0) return; // Only allow interaction from above the block

    // Use atan instead of atan2 for correct angle calculation relative to the vertical normal
    let angleRad = Math.atan(dx / -dy);
    let angleDeg = angleRad * (180 / Math.PI);

    const clampedAngle = Math.max(-89.9, Math.min(89.9, angleDeg));
    setIncidentAngle(clampedAngle);

  }, [p2.x, p2.y, setIncidentAngle]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleInteraction(e);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleInteraction(e);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleInteraction(e);
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if(isDragging) {
      e.preventDefault();
      handleInteraction(e);
    }
  }

  const getArcPath = (cx: number, cy: number, radius: number, angle1Rad: number, angle2Rad: number) => {
    const startAngleRad = Math.min(angle1Rad, angle2Rad);
    const endAngleRad = Math.max(angle1Rad, angle2Rad);

    const startX = cx + radius * Math.sin(startAngleRad);
    const startY = cy - radius * Math.cos(startAngleRad);
    const endX = cx + radius * Math.sin(endAngleRad);
    const endY = cy - radius * Math.cos(endAngleRad);

    // Always draw the small arc (large-arc-flag=0) with a positive sweep (sweep-flag=1) between the min and max angle.
    return `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;
  };

  const getDownwardArcPath = (cx: number, cy: number, radius: number, angle1Rad: number, angle2Rad: number) => {
    const startAngleRad = Math.min(angle1Rad, angle2Rad);
    const endAngleRad = Math.max(angle1Rad, angle2Rad);

    const startX = cx + radius * Math.sin(startAngleRad);
    const startY = cy + radius * Math.cos(startAngleRad); // Note: +cos for downward
    const endX = cx + radius * Math.sin(endAngleRad);
    const endY = cy + radius * Math.cos(endAngleRad); // Note: +cos for downward

    // Sweep flag 0 to draw the smaller arc section in the other direction.
    return `M ${startX} ${startY} A ${radius} ${radius} 0 0 0 ${endX} ${endY}`;
  }

  return (
    <div className="w-full h-full bg-white/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        className="w-full h-full cursor-pointer"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
          </marker>
           <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: 'rgb(34 211 238 / 0.25)'}} />
            <stop offset="100%" style={{stopColor: 'rgb(14 165 233 / 0.45)'}} />
          </linearGradient>
          <linearGradient id="shimmeringWhiteGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: 'rgba(255, 255, 255, 0.8)'}} />
            <stop offset="100%" style={{stopColor: 'rgba(230, 240, 255, 0.7)'}} />
          </linearGradient>
        </defs>

        {/* Backgrounds */}
        <rect x="0" y="0" width={VIEWBOX_WIDTH} height={BLOCK_Y} fill="url(#skyGradient)"/>
        <rect x="0" y={BLOCK_Y} width={VIEWBOX_WIDTH} height={BLOCK_HEIGHT} fill="url(#shimmeringWhiteGradient)"/>
        <rect x="0" y={BLOCK_Y + BLOCK_HEIGHT} width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT - BLOCK_Y - BLOCK_HEIGHT} fill="url(#skyGradient)"/>

        {/* Medium Labels */}
        <text x="20" y="40" fill="#0c4a6e" fontSize="24" fontWeight="medium">Medium 1 (n₁ = {n1.toFixed(2).replace('.', ',')})</text>
        <text x="20" y={BLOCK_Y + 40} fill="#334155" fontSize="24" fontWeight="medium">Medium 2 (n₂ = {n2.toFixed(2).replace('.', ',')})</text>

        {/* Normals */}
        <line x1={p2.x} y1="0" x2={p2.x} y2={VIEWBOX_HEIGHT} stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
        {!isTIR && <line x1={p3.x} y1={BLOCK_Y} x2={p3.x} y2={VIEWBOX_HEIGHT} stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />}

        {/* Light Ray */}
        <g stroke="black" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrow)">
            <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} />
            <line x1={p2.x} y1={p2.y} x2={p3.x} y2={p3.y} />
            {!isTIR && <line x1={p3.x} y1={p3.y} x2={p4.x} y2={p4.y} />}
        </g>

        {/* TIR Label */}
        {isTIR && <text x={p2.x + 15} y={p2.y - 40} fill="#ef4444" fontSize="18" fontWeight="bold">Total intern reflektion</text>}

        {/* Angle Arcs and Labels */}
        <g>
          {/* Theta 1 at entry -> i */}
          <path d={getArcPath(p2.x, p2.y, 40, 0, theta1Rad)} stroke="#0ea5e9" strokeWidth="2" fill="none"/>
          <text x={p2.x + 25 * Math.sin(theta1Rad/2) + (incidentAngle > 0 ? 5 : -25)} y={p2.y - 25 * Math.cos(theta1Rad/2)} fill="#0ea5e9" fontSize="18" fontStyle="italic">i</text>

          {isTIR ? (
             <g> {/* Reflection angle -> i' */}
               <path d={getArcPath(p2.x, p2.y, 60, 0, -theta1Rad)} stroke="#ec4899" strokeWidth="2" fill="none"/>
               <text x={p2.x + 40 * Math.sin(-theta1Rad/2) + (incidentAngle < 0 ? 5 : -25)} y={p2.y - 40 * Math.cos(-theta1Rad/2)} fill="#ec4899" fontSize="18" fontStyle="italic">i'</text>
             </g>
          ) : (
             <g> {/* Theta 2 at entry -> b */}
                <path d={getDownwardArcPath(p2.x, p2.y, 40, 0, theta2Rad)} stroke="#8b5cf6" strokeWidth="2" fill="none" />
                <text x={p2.x + 25 * Math.sin(theta2Rad/2) + (incidentAngle > 0 ? -25 : 5)} y={p2.y + 30 * Math.cos(theta2Rad/2)} fill="#8b5cf6" fontSize="18" fontStyle="italic">b</text>
             </g>
          )}
        </g>

        {!isTIR && (
           <g> {/* Angles at exit */}
              {/* Theta 2 at exit -> i */}
              <path d={getArcPath(p3.x, p3.y, 40, 0, -theta2Rad)} stroke="#8b5cf6" strokeWidth="2" fill="none"/>
              <text x={p3.x - 25 * Math.sin(theta2Rad/2) + (incidentAngle > 0 ? -25 : 5)} y={p3.y - 25 * Math.cos(theta2Rad/2)} fill="#8b5cf6" fontSize="18" fontStyle="italic">i</text>

              {/* Theta 1 at exit -> b */}
              <path d={getDownwardArcPath(p3.x, p3.y, 40, 0, -theta1Rad)} stroke="#0ea5e9" strokeWidth="2" fill="none" />
              <text x={p3.x - 25 * Math.sin(theta1Rad/2) + (incidentAngle > 0 ? -25 : 5)} y={p3.y + 30 * Math.cos(theta1Rad/2)} fill="#0ea5e9" fontSize="18" fontStyle="italic">b</text>
           </g>
        )}

      </svg>
    </div>
  );
};

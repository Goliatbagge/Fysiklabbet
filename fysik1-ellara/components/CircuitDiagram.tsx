import React, { useState, useEffect, useRef } from 'react';
import { CircuitType } from '../types';

interface CircuitDiagramProps {
  circuitType: CircuitType;
  showElectrons: boolean;
  showCurrentDirection: boolean;
  currentStrength: number;
  acFrequency: number;
  isPaused: boolean;
}

interface Electron {
  id: number;
  basePosition: number;
}

interface Arrow {
  id: number;
  basePosition: number;
}


// Constants for the SVG path
const PATH_LENGTH = 1000;
const TOP_WIRE_END = 300;
const RIGHT_WIRE_END = 500;
const BOTTOM_WIRE_END = 800;
const LEFT_WIRE_END = 1000;
const NUM_ELECTRONS = 50;
const NUM_ARROWS = 15;
const AC_AMPLITUDE_FACTOR = 10; // Adjusted for new current range
const ANIMATION_SPEED_FACTOR = 0.8; // To scale down high current values for animation

// Helper function to calculate x, y coordinates based on position along the path
const getCoordsOnPath = (position: number) => {
  const p = position % PATH_LENGTH;

  if (p >= 0 && p < TOP_WIRE_END) {
    // Top wire
    return { x: 50 + p, y: 50 };
  } else if (p >= TOP_WIRE_END && p < RIGHT_WIRE_END) {
    // Right wire
    return { x: 350, y: 50 + (p - TOP_WIRE_END) };
  } else if (p >= RIGHT_WIRE_END && p < BOTTOM_WIRE_END) {
    // Bottom wire
    return { x: 350 - (p - RIGHT_WIRE_END), y: 250 };
  } else {
    // Left wire
    return { x: 50, y: 250 - (p - BOTTOM_WIRE_END) };
  }
};


const CircuitDiagram: React.FC<CircuitDiagramProps> = ({ circuitType, showElectrons, showCurrentDirection, currentStrength, acFrequency, isPaused }) => {
  const [electrons, setElectrons] = useState<Electron[]>([]);
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const dcPositionOffset = useRef<number>(0);
  const dcArrowPositionOffset = useRef<number>(0);
  const currentStrengthRef = useRef(currentStrength);
  const isPausedRef = useRef(isPaused);
  const animateRef = useRef<((timestamp: number) => void) | null>(null);

  useEffect(() => {
    currentStrengthRef.current = currentStrength;
  }, [currentStrength]);

  useEffect(() => {
    isPausedRef.current = isPaused;
    // If we are resuming, and the animation isn't running, and we have a valid animate function
    if (!isPaused && animationFrameId.current === null && animateRef.current) {
        // Kickstart the animation loop.
        animationFrameId.current = requestAnimationFrame(animateRef.current);
    }
  }, [isPaused]);

  useEffect(() => {
    const initialElectrons: Electron[] = [];
    for (let i = 0; i < NUM_ELECTRONS; i++) {
      initialElectrons.push({
        id: i,
        basePosition: (i * PATH_LENGTH) / NUM_ELECTRONS,
      });
    }
    setElectrons(initialElectrons);

    const initialArrows: Arrow[] = [];
    for (let i = 0; i < NUM_ARROWS; i++) {
        initialArrows.push({
            id: i,
            basePosition: (i * PATH_LENGTH) / NUM_ARROWS,
        });
    }
    setArrows(initialArrows);

    dcPositionOffset.current = 0;
    dcArrowPositionOffset.current = 0;

    const animate = (timestamp: number) => {
      if (isPausedRef.current) {
        animationFrameId.current = null; // Mark as stopped
        return;
      }

      setElectrons(prev => prev.map(e => ({...e})));

      if (circuitType === CircuitType.DC) {
        const animationStep = currentStrengthRef.current * ANIMATION_SPEED_FACTOR;
        dcPositionOffset.current = (dcPositionOffset.current - animationStep) % PATH_LENGTH;
        dcArrowPositionOffset.current = (dcArrowPositionOffset.current + animationStep) % PATH_LENGTH;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animateRef.current = animate;

    if (!isPausedRef.current) {
        animationFrameId.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circuitType]);

  const acAnimationFrequencyFactor = (2 * Math.PI * acFrequency) / 1000;

  const Bulb: React.FC = () => {
    const glowOpacity = Math.max(0, Math.min(0.1 + currentStrength / 8, 1));
    const glowBlur = 3 + currentStrength * 2.5;

    return (
      <>
        <circle cx="350" cy="150" r="20" fill="none" stroke="#a78bfa" strokeWidth="2" />
        <line x1="340" y1="140" x2="360" y2="160" stroke="#a78bfa" strokeWidth="2" />
        <line x1="340" y1="160" x2="360" y2="140" stroke="#a78bfa" strokeWidth="2" />
        <circle cx="350" cy="150" r="25" fill="#facc15" className="transition-all duration-300" style={{ opacity: glowOpacity, filter: `blur(${glowBlur}px)` }} />
      </>
    );
  };

  const PowerSource: React.FC = () => {
      if (circuitType === CircuitType.DC) {
          return (
              <g>
                  <rect x="48" y="135" width="4" height="30" fill="#1f2937" />
                  <line x1="35" y1="135" x2="65" y2="135" stroke="#a78bfa" strokeWidth="2" />
                  <line x1="42" y1="165" x2="58" y2="165" stroke="#a78bfa" strokeWidth="2" />
                   <text x="70" y="138" fill="#f9fafb" fontSize="12px" aria-hidden="true">+</text>
                   <text x="70" y="168" fill="#f9fafb" fontSize="12px" aria-hidden="true">-</text>
              </g>
          );
      } else {
          return (
              <g>
                  <rect x="48" y="130" width="4" height="40" fill="#1f2937" />
                  <circle cx="50" cy="135" r="3" fill="#a78bfa" />
                  <circle cx="50" cy="165" r="3" fill="#a78bfa" />
                  <path d="M 50 140 C 60 145, 40 155, 50 160" stroke="#f9fafb" fill="none" strokeWidth="1.5" />
              </g>
          )
      }
  };

  const ArrowShapes = () => (
    <>
      {arrows.map(arrow => {
          const acAmplitude = currentStrength * AC_AMPLITUDE_FACTOR;
          const posValue = arrow.basePosition + (circuitType === CircuitType.AC
            ? -acAmplitude * Math.sin(performance.now() * acAnimationFrequencyFactor)
            : dcArrowPositionOffset.current
          );

          const normalizedPos = ((posValue % PATH_LENGTH) + PATH_LENGTH) % PATH_LENGTH;

          if (normalizedPos > 885 && normalizedPos < 915) return null;
          if (normalizedPos > 380 && normalizedPos < 420) return null;

          const { x, y } = getCoordsOnPath(normalizedPos);
          const { x: x2, y: y2 } = getCoordsOnPath(normalizedPos + 1);
          let angle = Math.atan2(y2 - y, x2 - x) * (180 / Math.PI);

          if (circuitType === CircuitType.AC) {
            const velocityDirection = -Math.cos(performance.now() * acAnimationFrequencyFactor);
            if (velocityDirection < 0) {
              angle += 180;
            }
          }

          return (
            <path
              key={`arrow-${arrow.id}`}
              d="M-5 -4 L5 0 L-5 4 Z"
              fill="#a78bfa"
              transform={`translate(${x} ${y}) rotate(${angle})`}
              aria-label="Strömriktningspil"
            />
          );
      })}
    </>
  );

  const ElectronDots = () => (
    <>
      {electrons.map(electron => {
          const acAmplitude = currentStrength * AC_AMPLITUDE_FACTOR;
          const posValue = electron.basePosition + (circuitType === CircuitType.AC
            ? acAmplitude * Math.sin(performance.now() * acAnimationFrequencyFactor)
            : dcPositionOffset.current
          );

          const normalizedPos = ((posValue % PATH_LENGTH) + PATH_LENGTH) % PATH_LENGTH;

          if (normalizedPos > 885 && normalizedPos < 915) return null;
          if (normalizedPos > 380 && normalizedPos < 420) return null;

          const { x, y } = getCoordsOnPath(normalizedPos);
          return (
            <g key={electron.id} aria-label="Elektron">
              <circle cx={x} cy={y} r="4" fill="#facc15" />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#1f2937"
                fontSize="6px"
                fontWeight="bold"
                aria-hidden="true"
              >
                -
              </text>
            </g>
          );
      })}
    </>
  );

  return (
    <div className="w-full max-w-2xl p-4 bg-gray-800 rounded-lg shadow-2xl border border-gray-700">
      <svg viewBox="0 0 400 300" className="w-full h-auto" aria-labelledby="circuit-title" role="img">
        <title id="circuit-title">Animation av en {circuitType === CircuitType.DC ? 'likströmskrets' : 'växelströmskrets'}</title>

        <path
          d="M 50 50 H 350 V 250 H 50 Z"
          fill="none"
          stroke="#4f46e5"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <g role="presentation">
            {showCurrentDirection && <ArrowShapes />}
        </g>

        <PowerSource />
        <Bulb />

        <g role="presentation">
            {showElectrons && <ElectronDots/>}
        </g>
      </svg>
    </div>
  );
};

export default CircuitDiagram;

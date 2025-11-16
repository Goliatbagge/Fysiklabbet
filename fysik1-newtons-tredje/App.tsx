import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Vector2D, AstronautState, ParticleState, SatelliteState } from './types';
import Starfield from './components/Starfield';
import Astronaut from './components/Astronaut';
import ForceVectors from './components/ForceVectors';
import Satellite from './components/Satellite';

const THRUST_FORCE = 0.05;
const PARTICLE_SPEED = 2;
const PARTICLE_LIFESPAN = 60; // in frames

const ASTRONAUT_RADIUS = 35;
const ASTRONAUT_MASS = 1;
const SATELLITE_MASS = 10;
const SATELLITE_RADIUS = 100; // General size for initial placement

const getInitialAstronautState = (): AstronautState => ({
  position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  velocity: { x: 0, y: 0 },
  rotation: 0,
  mass: ASTRONAUT_MASS,
  radius: ASTRONAUT_RADIUS,
});

const App: React.FC = () => {
  const [astronaut, setAstronaut] = useState<AstronautState>(getInitialAstronautState);
  const [satellite, setSatellite] = useState<SatelliteState | null>(null);
  const [particles, setParticles] = useState<ParticleState[]>([]);
  const [isSpraying, setIsSpraying] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isDocked, setIsDocked] = useState(false);

  const mousePosition = useRef<Vector2D>({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();
  const particleIdCounter = useRef(0);

  const handleStartGame = () => {
    setShowInstructions(false);
    setIsDocked(false);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const margin = 150; // Don't spawn too close to the edge
    let x = Math.random() * (width - margin * 2) + margin;
    let y = Math.random() * (height - margin * 2) + margin;

    // Avoid spawning on top of the astronaut
    const distToCenter = Math.sqrt(Math.pow(x - width/2, 2) + Math.pow(y - height/2, 2));
    if (distToCenter < 300) {
        // Just move it if too close
        x = margin + 50;
        y = margin + 50;
    }

    setSatellite({
      position: { x, y },
      velocity: { x: 0, y: 0 },
      rotation: Math.random() * 360,
      mass: SATELLITE_MASS,
      radius: SATELLITE_RADIUS,
    });
  };

  const handleRestart = useCallback(() => {
    setAstronaut(getInitialAstronautState());
    setParticles([]);
    setSatellite(null);
    setShowInstructions(true);
    setIsSpraying(false);
    setIsDocked(false);
  }, []);

  // --- Input Handlers ---
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (showInstructions) setShowInstructions(false);
    mousePosition.current = { x: e.clientX, y: e.clientY };
    setIsSpraying(true);
  }, [showInstructions]);

  const handleMouseUp = useCallback(() => setIsSpraying(false), []);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    mousePosition.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    e.preventDefault();
    if (showInstructions) setShowInstructions(false);
    if (e.touches.length > 0) {
      mousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      setIsSpraying(true);
    }
  }, [showInstructions]);

  const handleTouchEnd = useCallback(() => setIsSpraying(false), []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (isSpraying) {
      e.preventDefault();
      if (e.touches.length > 0) {
        mousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }
  }, [isSpraying]);


  // --- Game Loop ---
  const gameLoop = useCallback(() => {
    if (isDocked) {
      animationFrameId.current = requestAnimationFrame(gameLoop);
      return;
    }

    // --- Update astronaut from input ---
    let nextAstronaut = { ...astronaut };
    if (isSpraying) {
      const dx = mousePosition.current.x - nextAstronaut.position.x;
      const dy = mousePosition.current.y - nextAstronaut.position.y;
      const angleRad = Math.atan2(dy, dx);
      nextAstronaut.rotation = angleRad * (180 / Math.PI);

      const forceX = Math.cos(angleRad) * THRUST_FORCE;
      const forceY = Math.sin(angleRad) * THRUST_FORCE;

      nextAstronaut.velocity = {
        x: nextAstronaut.velocity.x - forceX,
        y: nextAstronaut.velocity.y - forceY
      };
    }

    let nextSatellite = satellite ? { ...satellite } : null;

    // --- Collision & Docking Physics ---
    if (nextSatellite) {
      const dx = nextAstronaut.position.x - nextSatellite.position.x;
      const dy = nextAstronaut.position.y - nextSatellite.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Simple broad-phase check to reduce calculations
      if (distance < nextAstronaut.radius + nextSatellite.radius) {
        // --- Transform astronaut position to satellite's local space ---
        // This allows us to check for collision against a non-rotated satellite shape
        const satAngleRad = nextSatellite.rotation * (Math.PI / 180);
        const cos = Math.cos(-satAngleRad);
        const sin = Math.sin(-satAngleRad);

        const localAstroPos = {
            x: cos * dx - sin * dy,
            y: sin * dx + cos * dy
        };

        // The satellite's visual/physics center is not at (0,0) in its SVG coordinate space.
        // The viewBox="-40 -70 240 240" and the SVG elements' positions mean the
        // center of rotation is at approximately (80, 50) in the SVG's local coordinates.
        // We need to translate the astronaut's position into this SVG coordinate space.
        const SVG_CENTER_OFFSET = { x: 80, y: 50 };
        const localAstroPos_svg = {
            x: localAstroPos.x + SVG_CENTER_OFFSET.x,
            y: localAstroPos.y + SVG_CENTER_OFFSET.y,
        };

        // --- Define Satellite Geometry in Local Space ---
        // These values must match the SVG in Satellite.tsx
        const DOCKING_BAY_START_X = 100;
        const DOCKING_BAY_OPEN_Y = 25;
        const DOCKING_BAY_HEIGHT = 40;
        const DOCKING_BAY_DEPTH = 30;

        // --- Docking Check ---
        const isInsideDockingBay =
            localAstroPos_svg.x > DOCKING_BAY_START_X &&
            localAstroPos_svg.x < DOCKING_BAY_START_X + DOCKING_BAY_DEPTH &&
            localAstroPos_svg.y > DOCKING_BAY_OPEN_Y &&
            localAstroPos_svg.y < DOCKING_BAY_OPEN_Y + DOCKING_BAY_HEIGHT;

        const astroSpeed = Math.sqrt(nextAstronaut.velocity.x**2 + nextAstronaut.velocity.y**2);

        if (isInsideDockingBay && astroSpeed < 0.5) {
            setIsDocked(true);
        } else {
            // --- Collision Check ---
            // Define the satellite's collision geometry to match its C-shape
            const collisionBoxes = [
                // Replace the single main body box with three boxes that form an opening
                { x: 0, y: 0, width: 100, height: 25 },     // Top part of the main body
                { x: 0, y: 65, width: 100, height: 25 },    // Bottom part of the main body
                { x: 0, y: 25, width: 95, height: 40 },     // Back wall of the main body (inset slightly)

                // Original arms around the docking bay entrance
                { x: 100, y: 0, width: 30, height: 25 },    // Top arm
                { x: 100, y: 65, width: 30, height: 25 },   // Bottom arm
            ];

            let collisionOccurred = false;

            for (const box of collisionBoxes) {
                // Find the closest point on the rectangle to the astronaut's center
                const closestX = Math.max(box.x, Math.min(localAstroPos_svg.x, box.x + box.width));
                const closestY = Math.max(box.y, Math.min(localAstroPos_svg.y, box.y + box.height));

                const distToClosest = Math.sqrt(
                    (localAstroPos_svg.x - closestX)**2 + (localAstroPos_svg.y - closestY)**2
                );

                if (distToClosest < nextAstronaut.radius) {
                    // --- Elastic Collision Response ---
                    // 1. Calculate the collision normal vector in the satellite's local space
                    let localNormal = {
                        x: localAstroPos_svg.x - closestX,
                        y: localAstroPos_svg.y - closestY,
                    };
                    const mag = Math.sqrt(localNormal.x**2 + localNormal.y**2);
                    if (mag > 0) {
                        localNormal.x /= mag;
                        localNormal.y /= mag;
                    } else {
                        // This happens if the center is exactly on the closest point.
                        // We need to find the penetration depth and push outwards from the nearest edge.
                        const dx1 = localAstroPos_svg.x - box.x;
                        const dx2 = (box.x + box.width) - localAstroPos_svg.x;
                        const dy1 = localAstroPos_svg.y - box.y;
                        const dy2 = (box.y + box.height) - localAstroPos_svg.y;
                        const min_d = Math.min(dx1, dx2, dy1, dy2);
                        if (min_d === dx1) localNormal = { x: -1, y: 0 };
                        else if (min_d === dx2) localNormal = { x: 1, y: 0 };
                        else if (min_d === dy1) localNormal = { x: 0, y: -1 };
                        else localNormal = { x: 0, y: 1 };
                    }

                    // 2. Rotate the local normal back to world space
                    const worldNormal = {
                        x: Math.cos(satAngleRad) * localNormal.x - Math.sin(satAngleRad) * localNormal.y,
                        y: Math.sin(satAngleRad) * localNormal.x + Math.cos(satAngleRad) * localNormal.y,
                    };

                    const normal = worldNormal;
                    const tangent = { x: -normal.y, y: normal.x };

                    const dpTanA = nextAstronaut.velocity.x * tangent.x + nextAstronaut.velocity.y * tangent.y;
                    const dpTanS = nextSatellite.velocity.x * tangent.x + nextSatellite.velocity.y * tangent.y;
                    const dpNormA = nextAstronaut.velocity.x * normal.x + nextAstronaut.velocity.y * normal.y;
                    const dpNormS = nextSatellite.velocity.x * normal.x + nextSatellite.velocity.y * normal.y;

                    const m1 = (dpNormA * (nextAstronaut.mass - nextSatellite.mass) + 2 * nextSatellite.mass * dpNormS) / (nextAstronaut.mass + nextSatellite.mass);
                    const m2 = (dpNormS * (nextSatellite.mass - nextAstronaut.mass) + 2 * nextAstronaut.mass * dpNormA) / (nextAstronaut.mass + nextSatellite.mass);

                    nextAstronaut.velocity = {
                        x: tangent.x * dpTanA + normal.x * m1,
                        y: tangent.y * dpTanA + normal.y * m1
                    };
                    nextSatellite.velocity = {
                        x: tangent.x * dpTanS + normal.x * m2,
                        y: tangent.y * dpTanS + normal.y * m2
                    };

                    // Move objects apart to prevent sticking
                    const overlap = nextAstronaut.radius - distToClosest;
                    nextAstronaut.position.x += worldNormal.x * overlap;
                    nextAstronaut.position.y += worldNormal.y * overlap;

                    collisionOccurred = true;
                    break; // Stop checking after the first collision
                }
            }
        }
      }
    }

    // --- Update Positions ---
    nextAstronaut.position = {
      x: nextAstronaut.position.x + nextAstronaut.velocity.x,
      y: nextAstronaut.position.y + nextAstronaut.velocity.y,
    };
    if (nextSatellite) {
      nextSatellite.position = {
        x: nextSatellite.position.x + nextSatellite.velocity.x,
        y: nextSatellite.position.y + nextSatellite.velocity.y,
      };
    }

    // Screen wrapping
    if (nextAstronaut.position.x < -40) nextAstronaut.position.x = window.innerWidth + 40;
    if (nextAstronaut.position.x > window.innerWidth + 40) nextAstronaut.position.x = -40;
    if (nextAstronaut.position.y < -40) nextAstronaut.position.y = window.innerHeight + 40;
    if (nextAstronaut.position.y > window.innerHeight + 40) nextAstronaut.position.y = -40;

    if (nextSatellite) {
      const satelliteBuffer = 120; // A bit larger than its radius of 100
      if (nextSatellite.position.x < -satelliteBuffer) nextSatellite.position.x = window.innerWidth + satelliteBuffer;
      if (nextSatellite.position.x > window.innerWidth + satelliteBuffer) nextSatellite.position.x = -satelliteBuffer;
      if (nextSatellite.position.y < -satelliteBuffer) nextSatellite.position.y = window.innerHeight + satelliteBuffer;
      if (nextSatellite.position.y > window.innerHeight + satelliteBuffer) nextSatellite.position.y = -satelliteBuffer;
    }

    setAstronaut(nextAstronaut);
    setSatellite(nextSatellite);

    // --- Particle Physics ---
    setParticles((prev) => {
      let newParticles = prev.map((p) => ({...p, life: p.life - 1, opacity: p.life / PARTICLE_LIFESPAN, position: { x: p.position.x + p.velocity.x, y: p.position.y + p.velocity.y }})).filter((p) => p.life > 0);
      if (isSpraying) {
        const angleRad = astronaut.rotation * (Math.PI / 180);
        const nozzleOffsetX = Math.cos(angleRad) * 50;
        const nozzleOffsetY = Math.sin(angleRad) * 50;
        const startPos = { x: astronaut.position.x + nozzleOffsetX, y: astronaut.position.y + nozzleOffsetY };
        const sprayAngle = Math.atan2(mousePosition.current.y - astronaut.position.y, mousePosition.current.x - astronaut.position.x);

        for (let i = 0; i < 3; i++) {
          const spread = (Math.random() - 0.5) * 0.5;
          const speed = PARTICLE_SPEED * (Math.random() * 0.5 + 0.75);
          const vel = { x: Math.cos(sprayAngle + spread) * speed, y: Math.sin(sprayAngle + spread) * speed };
          newParticles.push({ id: particleIdCounter.current++, position: startPos, velocity: vel, size: Math.random() * 3 + 2, opacity: 1, life: PARTICLE_LIFESPAN });
        }
      }
      return newParticles;
    });

    animationFrameId.current = requestAnimationFrame(gameLoop);
  }, [astronaut, satellite, isSpraying, isDocked]);

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameLoop]);

  return (
    <div
      className="w-screen h-screen bg-gray-900 cursor-crosshair touch-none"
      onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchMove={handleTouchMove} onTouchCancel={handleTouchEnd}
    >
      <Starfield />

      <div className="absolute top-4 left-4 z-50 flex flex-col gap-2">
        {!satellite && (
          <button onClick={handleStartGame} className="px-4 py-2 bg-cyan-500 text-black font-bold rounded-lg shadow-lg hover:bg-cyan-400 transition-colors">
            Starta spelläge
          </button>
        )}
        {(satellite || !showInstructions) && <button onClick={handleRestart} className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-400 transition-colors">
            Omstart
        </button>}
      </div>

      {showInstructions && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-white text-center text-xl md:text-2xl p-4 bg-black bg-opacity-50 rounded-lg animate-pulse w-11/12 md:w-auto">
          <h1 className="font-bold text-3xl md:text-4xl mb-2 text-cyan-300">Newtons Tredje Lag</h1>
          <p>Klicka/tryck och håll för att använda brandsläckaren.</p>
          <p>Eller starta spelläget för en utmaning!</p>
        </div>
      )}

      {satellite && !showInstructions && !isDocked && (
         <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white text-center text-xl p-2 bg-black bg-opacity-50 rounded-lg w-11/12 md:w-auto">
          <p>Navigera till den gula dockningsporten!</p>
        </div>
      )}

      {isDocked && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center text-4xl p-8 bg-green-600 bg-opacity-80 rounded-xl shadow-2xl">
          <h2 className="font-bold">Grattis!</h2>
          <p className="text-xl mt-2">Du är i trygghet!</p>
        </div>
      )}

      {particles.map((p) => (
        <div key={p.id} className="absolute bg-gray-200 rounded-full" style={{ left: p.position.x, top: p.position.y, width: `${p.size}px`, height: `${p.size}px`, opacity: p.opacity, transform: 'translate(-50%, -50%)' }} />
      ))}

      <Astronaut state={astronaut} />
      {satellite && <Satellite state={satellite} />}

      <ForceVectors isSpraying={isSpraying} astronautPosition={astronaut.position} targetPosition={mousePosition.current} />
    </div>
  );
};

export default App;

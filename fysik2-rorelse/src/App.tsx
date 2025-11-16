import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { SimulationCanvas } from './components/SimulationCanvas';
import type { SimulationParams, Vector, Point } from './types';
import { DEFAULT_GRAVITY, TIME_STEP, DRAG_COEFFICIENT, CELESTIAL_BODIES } from './constants';
import { PlayIcon, ResetIcon, PauseIcon, StepForwardIcon, StepBackwardIcon } from './components/icons';

type SimulationStatus = 'idle' | 'running' | 'paused' | 'finished';

interface SimulationState {
  time: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  currentPeak: Point;
}


const App: React.FC = () => {
  const [params, setParams] = useState<SimulationParams>({
    angle: 45,
    initialVelocity: 26,
    initialHeight: 0,
    showVx: true,
    showVy: true,
    showV: true,
    airResistance: false,
    gravity: DEFAULT_GRAVITY,
    showAxes: true,
    showSymmetryLine: false,
  });

  const [status, setStatus] = useState<SimulationStatus>('idle');
  const [projectile, setProjectile] = useState<Point>({ x: 0, y: params.initialHeight });
  const [velocity, setVelocity] = useState<Vector>({ vx: 0, vy: 0 });
  const [trajectory, setTrajectory] = useState<Point[]>([]);
  const [history, setHistory] = useState<SimulationState[]>([]);
  const [maxHeight, setMaxHeight] = useState(0);
  const [flightTime, setFlightTime] = useState(0);
  const [range, setRange] = useState(0);
  const [trajectoryPeak, setTrajectoryPeak] = useState<Point | null>(null);
  const [finishedRunAirResistance, setFinishedRunAirResistance] = useState<boolean>(false);
  const [zoom, setZoom] = useState(1);
  const [cameraOffset, setCameraOffset] = useState<Point>({ x: 0, y: 0 });


  const simulationState = useRef<SimulationState>({
    time: 0,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    currentPeak: { x: 0, y: 0 },
  });

  const animationFrameId = useRef<number>();

  const resetSimulation = useCallback(() => {
    setStatus('idle');
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    const initialY = params.initialHeight > 0 ? params.initialHeight : 0;
    setProjectile({ x: 0, y: initialY });
    setVelocity({ vx: 0, vy: 0 });
    setTrajectory([{x: 0, y: initialY}]);
    setHistory([]);
    setMaxHeight(0);
    setFlightTime(0);
    setRange(0);
    setTrajectoryPeak(null);
    setParams(p => ({ ...p, showSymmetryLine: false }));
    setZoom(1);
    setCameraOffset({ x: 0, y: 0 });
  }, [params.initialHeight]);

  useEffect(() => {
    resetSimulation();
  }, [params.angle, params.initialVelocity, params.initialHeight, params.airResistance, params.gravity, params.showAxes, resetSimulation]);


  const startSimulation = () => {
    setStatus('idle');
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    const initialY = params.initialHeight > 0 ? params.initialHeight : 0;
    const initialPoint = { x: 0, y: initialY };

    setProjectile(initialPoint);
    setVelocity({ vx: 0, vy: 0 });
    setTrajectory([initialPoint]);
    setMaxHeight(0);
    setFlightTime(0);
    setRange(0);
    setTrajectoryPeak(null);
    setZoom(1);
    setCameraOffset({ x: 0, y: 0 });

    const angleInRadians = (params.angle * Math.PI) / 180;

    const initialState: SimulationState = {
      time: 0,
      x: 0,
      y: initialY,
      vx: params.initialVelocity * Math.cos(angleInRadians),
      vy: params.initialVelocity * Math.sin(angleInRadians),
      currentPeak: { x: 0, y: initialY },
    };
    simulationState.current = initialState;

    setHistory([initialState]);
    setFinishedRunAirResistance(params.airResistance);
    setStatus('running');
  };

  const simulationLoop = useCallback(() => {
    const state = simulationState.current;

    let { time, x, y, vx, vy, currentPeak } = state;

    if (params.airResistance) {
      const speed = Math.sqrt(vx * vx + vy * vy);
      const dragForceX = -DRAG_COEFFICIENT * vx * speed;
      const dragForceY = -DRAG_COEFFICIENT * vy * speed;

      const ax = dragForceX; // Assuming mass = 1 for simplicity
      const ay = -params.gravity + dragForceY;

      vx += ax * TIME_STEP;
      vy += ay * TIME_STEP;
    } else {
      vy -= params.gravity * TIME_STEP;
    }

    x += vx * TIME_STEP;
    y += vy * TIME_STEP;
    time += TIME_STEP;

    if(y > currentPeak.y){
      currentPeak = { x, y };
    }

    const newState = { time, x, y, vx, vy, currentPeak };
    simulationState.current = newState;

    setProjectile({ x, y });
    setVelocity({ vx, vy });

    setHistory(prev => [...prev, newState]);
    setTrajectory(prev => {
        if (Math.floor(time / (TIME_STEP * 5)) > prev.length - 1) {
            return [...prev, { x, y }];
        }
        return prev;
    });


    if (y < 0) {
      setStatus('finished');
      setMaxHeight(newState.currentPeak.y);
      setTrajectoryPeak(newState.currentPeak);
      setFlightTime(time);
      setRange(x);
      cancelAnimationFrame(animationFrameId.current!);
    } else {
      animationFrameId.current = requestAnimationFrame(simulationLoop);
    }
  }, [params.airResistance, params.gravity]);


  useEffect(() => {
    if (status === 'running') {
      animationFrameId.current = requestAnimationFrame(simulationLoop);
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [status, simulationLoop]);

  const handlePrimaryAction = () => {
    if (status === 'running') {
        setStatus('paused');
    } else if (status === 'paused') {
        setStatus('running');
    } else {
        startSimulation();
    }
  };

  const stepForward = () => {
    if (status !== 'paused' || projectile.y < 0) return;

    const state = simulationState.current;
    let { time, x, y, vx, vy, currentPeak } = state;

    if (params.airResistance) {
        const speed = Math.sqrt(vx * vx + vy * vy);
        const dragForceX = -DRAG_COEFFICIENT * vx * speed;
        const dragForceY = -DRAG_COEFFICIENT * vy * speed;
        const ax = dragForceX;
        const ay = -params.gravity + dragForceY;
        vx += ax * TIME_STEP;
        vy += ay * TIME_STEP;
    } else {
        vy -= params.gravity * TIME_STEP;
    }

    x += vx * TIME_STEP;
    y += vy * TIME_STEP;
    time += TIME_STEP;

    if (y > currentPeak.y) {
        currentPeak = { x, y };
    }

    const newState: SimulationState = { time, x, y, vx, vy, currentPeak };
    simulationState.current = newState;

    setProjectile({ x, y });
    setVelocity({ vx, vy });
    setHistory(prev => [...prev, newState]);
    setTrajectory(prev => {
        if (Math.floor(time / (TIME_STEP * 5)) > prev.length - 1) {
            return [...prev, { x, y }];
        }
        return prev;
    });

    if (y < 0) {
        setStatus('finished');
        setMaxHeight(newState.currentPeak.y);
        setTrajectoryPeak(newState.currentPeak);
        setFlightTime(time);
        setRange(x);
    }
  };

  const stepBackward = () => {
      if (status !== 'paused' || history.length <= 1) return;

      const newHistory = history.slice(0, -1);
      const prevState = newHistory[newHistory.length - 1];

      simulationState.current = prevState;

      setHistory(newHistory);
      setProjectile({ x: prevState.x, y: prevState.y });
      setVelocity({ vx: prevState.vx, vy: prevState.vy });

      setTrajectory(prev => {
          const newTrajLength = Math.floor(prevState.time / (TIME_STEP * 5)) + 1;
          if (prev.length > newTrajLength) {
              return prev.slice(0, newTrajLength);
          }
          return prev;
      });
  };

  const activeBody = CELESTIAL_BODIES.find(body => Math.abs(body.gravity - params.gravity) < 0.01);
  const groundColor = activeBody?.groundColor || '#16a34a'; // Default to green
  const groundHighlightColor = activeBody?.groundHighlightColor || '#22c55e';

  const primaryButtonText = status === 'running' ? 'Pausa' : status === 'paused' ? 'Återuppta' : status === 'idle' && flightTime > 0 ? 'Kör igen' : 'Starta';
  const PrimaryIcon = status === 'running' ? PauseIcon : PlayIcon;

  return (
    <>
      {/* Navigation bar */}
      <nav style={{
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <a href="/index.html" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            color: '#1e293b',
            fontWeight: 700,
            fontSize: '1.5rem'
          }}>
            <span style={{ fontSize: '2rem' }}>⚛️</span>
            <span>Fysiklabbet</span>
          </a>
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '2rem',
            margin: 0,
            padding: 0
          }}>
            <li><a href="/index.html" style={{ textDecoration: 'none', color: '#64748b', fontWeight: 500 }}>Hem</a></li>
            <li><a href="/fysik1.html" style={{ textDecoration: 'none', color: '#64748b', fontWeight: 500 }}>Fysik 1</a></li>
            <li><a href="/fysik2.html" style={{ textDecoration: 'none', color: '#3b82f6', fontWeight: 500, position: 'relative' }}>
              Fysik 2
              <span style={{
                content: '',
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                borderRadius: '2px'
              }}></span>
            </a></li>
          </ul>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1rem 2rem',
        color: '#64748b',
        fontSize: '0.95rem'
      }}>
        <a href="/index.html" style={{ color: '#3b82f6', textDecoration: 'none' }}>Hem</a> /
        <a href="/fysik2.html" style={{ color: '#3b82f6', textDecoration: 'none', margin: '0 0.25rem' }}>Fysik 2</a> /
        <span style={{ margin: '0 0.25rem' }}>Rörelse och Krafter</span>
      </div>

      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0f172a' }}>
        <main className="flex-grow flex flex-col lg:flex-row items-stretch">
          <div className="flex-grow flex flex-col items-center justify-start p-4 lg:p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6">Snett kast</h1>
          <SimulationCanvas
          projectile={projectile}
          trajectory={trajectory}
          velocity={velocity}
          showVx={params.showVx}
          showVy={params.showVy}
          showV={params.showV}
          initialHeight={params.initialHeight}
          groundColor={groundColor}
          groundHighlightColor={groundHighlightColor}
          launchAngle={params.angle}
          initialVelocity={params.initialVelocity}
          status={status}
          showAxes={params.showAxes}
          showSymmetryLine={params.showSymmetryLine}
          trajectoryPeak={trajectoryPeak}
          zoom={zoom}
          setZoom={setZoom}
          cameraOffset={cameraOffset}
          setCameraOffset={setCameraOffset}
        />
         <div className="flex items-center space-x-4 mt-6">
            <button
                onClick={handlePrimaryAction}
                className="w-48 flex items-center justify-center space-x-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 text-lg"
            >
                <PrimaryIcon />
                <span>{primaryButtonText}</span>
            </button>
             <div className="flex items-center bg-slate-700/50 rounded-lg">
                <button
                    onClick={stepBackward}
                    disabled={status !== 'paused' || history.length <= 1}
                    className="p-3 text-slate-200 hover:bg-slate-600 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Stega bakåt" title="Stega bakåt"
                >
                    <StepBackwardIcon />
                </button>
                <div className="w-px h-5 bg-slate-600/50"></div>
                <button
                    onClick={stepForward}
                    disabled={status !== 'paused'}
                    className="p-3 text-slate-200 hover:bg-slate-600 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Stega framåt" title="Stega framåt"
                >
                    <StepForwardIcon />
                </button>
            </div>
            <button
                onClick={resetSimulation}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold p-4 rounded-lg transition-all duration-200"
                aria-label="Återställ"
            >
                <ResetIcon />
            </button>
          </div>
        </div>
        <aside className="w-full lg:w-96 bg-slate-800/50 backdrop-blur-sm p-6 shadow-2xl flex-shrink-0">
        <ControlPanel
          params={params}
          setParams={setParams}
          status={status}
          results={{maxHeight, flightTime, range}}
          finishedRunAirResistance={finishedRunAirResistance}
        />
        </aside>
      </main>
      </div>
    </>
  );
};

export default App;

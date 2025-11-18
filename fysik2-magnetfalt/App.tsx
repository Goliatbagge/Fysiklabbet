import React, { useState, useCallback } from 'react';
import { Scene } from './components/Scene';
import { UIControls } from './components/UIControls';
import { SimulationState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<SimulationState>({
    currentDirection: 1, // Start pointing UP
    showFieldLines: true,
    showFieldDirection: false,
    showLabels: false,
  });

  const toggleDirection = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDirection: prev.currentDirection === 1 ? -1 : 1,
    }));
  }, []);

  const toggleFieldLines = useCallback(() => {
    setState((prev) => {
        // If turning off lines, also turn off direction arrows as they depend on lines
        const newShowLines = !prev.showFieldLines;
        return {
            ...prev,
            showFieldLines: newShowLines,
            showFieldDirection: newShowLines ? prev.showFieldDirection : false
        };
    });
  }, []);

  const toggleFieldDirection = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showFieldDirection: !prev.showFieldDirection,
    }));
  }, []);

  const toggleLabels = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showLabels: !prev.showLabels,
    }));
  }, []);

  return (
    <div className="relative w-screen h-screen bg-slate-900">
      {/* Main 3D Scene */}
      <Scene
        currentDirection={state.currentDirection}
        showFieldLines={state.showFieldLines}
        showFieldDirection={state.showFieldDirection}
        showLabels={state.showLabels}
      />

      {/* Overlay UI */}
      <UIControls
        currentDirection={state.currentDirection}
        showFieldLines={state.showFieldLines}
        showFieldDirection={state.showFieldDirection}
        showLabels={state.showLabels}
        toggleDirection={toggleDirection}
        toggleFieldLines={toggleFieldLines}
        toggleFieldDirection={toggleFieldDirection}
        toggleLabels={toggleLabels}
      />

      {/* Footer / Credits */}
      <div className="absolute bottom-4 right-4 text-slate-500 text-xs pointer-events-none select-none">
         Interaktiv Fysik • React Three Fiber
      </div>
    </div>
  );
};

export default App;

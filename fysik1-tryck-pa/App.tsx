import React, { useState, useMemo, useCallback } from 'react';
import Scene3D from './components/Scene3D';
import SliderControl from './components/SliderControl';
import InfoPanel from './components/InfoPanel';
import {
  INITIAL_FORCE,
  INITIAL_AREA,
  MIN_FORCE,
  MAX_FORCE,
  MIN_AREA,
  MAX_AREA,
  ICE_BREAKING_POINT
} from './constants';

const App: React.FC = () => {
  const [force, setForce] = useState<number>(INITIAL_FORCE);
  const [area, setArea] = useState<number>(INITIAL_AREA);
  const [isBroken, setIsBroken] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0); // Used to reset the 3D scene

  const pressure = useMemo(() => {
    if (area === 0) return Infinity;
    const calculatedPressure = force / area;
    if (calculatedPressure > ICE_BREAKING_POINT && !isBroken) {
      setIsBroken(true);
    }
    return calculatedPressure;
  }, [force, area, isBroken]);

  const handleReset = useCallback(() => {
    setForce(INITIAL_FORCE);
    setArea(INITIAL_AREA);
    setIsBroken(false);
    setKey(prevKey => prevKey + 1); // Change key to force re-mount of Scene3D
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-sky-900 flex flex-col items-center p-4 lg:p-8 font-sans">
      <header className="w-full max-w-6xl text-center mb-4 md:mb-6">
        <h1 className="text-3xl md:text-5xl font-bold text-ice-blue">Interaktiv Trycksimulering</h1>
        <p className="text-lg md:text-2xl text-sky-300 mt-2">p = F / A</p>
      </header>

      <main className="w-full max-w-6xl flex-grow flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/5 h-[40vh] lg:h-auto rounded-xl bg-black/30 shadow-2xl overflow-hidden border border-sky-700">
          <Scene3D
            key={key}
            area={area}
            force={force}
            isBroken={isBroken}
            pressure={pressure}
            breakingPoint={ICE_BREAKING_POINT}
          />
        </div>

        <div className="lg:w-2/5 flex flex-col gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-sky-800 animate-fade-in">
            <h2 className="text-xl font-bold mb-4 text-sky-200 border-b border-sky-700 pb-2">Kontrollpanel</h2>
            <div className="space-y-6">
              <SliderControl
                label="Tyngd (F)"
                value={force}
                min={MIN_FORCE}
                max={MAX_FORCE}
                step={10}
                unit="N"
                onChange={(e) => !isBroken && setForce(parseFloat(e.target.value))}
                disabled={isBroken}
              />
              <SliderControl
                label="Area (A)"
                value={area}
                min={MIN_AREA}
                max={MAX_AREA}
                step={0.05}
                unit="m²"
                onChange={(e) => !isBroken && setArea(parseFloat(e.target.value))}
                disabled={isBroken}
              />
            </div>
          </div>

          <InfoPanel
            force={force}
            area={area}
            pressure={pressure}
            isBroken={isBroken}
            breakingPoint={ICE_BREAKING_POINT}
            onReset={handleReset}
          />
        </div>
      </main>

      <footer className="w-full max-w-6xl text-center mt-8 text-slate-400 text-sm">
        <p>Använd musen för att rotera, zooma och panorera 3D-vyn.</p>
      </footer>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { CircuitType } from './types';
import CircuitDiagram from './components/CircuitDiagram';

type DisplayMode = 'electrons' | 'current';

const App: React.FC = () => {
  const [circuitType, setCircuitType] = useState<CircuitType>(CircuitType.DC);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('current');
  const [voltage, setVoltage] = useState<number>(12);
  const [resistance, setResistance] = useState<number>(10);
  const [frequency, setFrequency] = useState<number>(1.0); // Default to 1.0 Hz
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const handleCircuitTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCircuitType(event.target.value as CircuitType);
  };

  const handleDisplayModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayMode(event.target.value as DisplayMode);
  };

  const handleVoltageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoltage(parseFloat(event.target.value));
  };

  const handleResistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResistance(parseFloat(event.target.value));
  };

  const handleFrequencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrequency(parseFloat(event.target.value));
  };

  const handlePauseToggle = () => {
    setIsPaused(prev => !prev);
  };

  const current = voltage / resistance;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-8">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            Interaktiv kretssimulator
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Observera elektronflödet i likströms- och växelströmskretsar.
          </p>
        </header>

        <main className="w-full flex flex-col items-center gap-6">
          <div className="w-full max-w-2xl flex flex-col items-center gap-4 p-4 bg-gray-800 border border-gray-700 rounded-lg">
            <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-4">
              <fieldset className="flex items-center justify-center gap-4 p-2 border border-gray-600 rounded-lg">
                <legend className="px-2 text-sm text-gray-400">Kretstyp</legend>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="circuitType"
                    value={CircuitType.DC}
                    checked={circuitType === CircuitType.DC}
                    onChange={handleCircuitTypeChange}
                    className="form-radio h-4 w-4 text-indigo-500 bg-gray-700 border-gray-600 focus:ring-indigo-500"
                  />
                  <span className={circuitType === CircuitType.DC ? 'text-purple-400 font-semibold' : 'text-gray-300'}>
                    Likström (DC)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="circuitType"
                    value={CircuitType.AC}
                    checked={circuitType === CircuitType.AC}
                    onChange={handleCircuitTypeChange}
                    className="form-radio h-4 w-4 text-indigo-500 bg-gray-700 border-gray-600 focus:ring-indigo-500"
                  />
                  <span className={circuitType === CircuitType.AC ? 'text-purple-400 font-semibold' : 'text-gray-300'}>
                    Växelström (AC)
                  </span>
                </label>
              </fieldset>

              <fieldset className="flex items-center justify-center gap-4 p-2 border border-gray-600 rounded-lg">
                <legend className="px-2 text-sm text-gray-400">Visningsläge</legend>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="displayMode"
                    value="electrons"
                    checked={displayMode === 'electrons'}
                    onChange={handleDisplayModeChange}
                    className="form-radio h-4 w-4 text-indigo-500 bg-gray-700 border-gray-600 focus:ring-indigo-500"
                  />
                  <span className={displayMode === 'electrons' ? 'text-purple-400 font-semibold' : 'text-gray-300'}>
                    Elektroner
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="displayMode"
                    value="current"
                    checked={displayMode === 'current'}
                    onChange={handleDisplayModeChange}
                    className="form-radio h-4 w-4 text-indigo-500 bg-gray-700 border-gray-600 focus:ring-indigo-500"
                  />
                  <span className={displayMode === 'current' ? 'text-purple-400 font-semibold' : 'text-gray-300'}>
                    Strömriktning
                  </span>
                </label>
              </fieldset>
            </div>

            <fieldset className="w-full max-w-md mt-4 p-3 border border-gray-600 rounded-lg">
              <legend className="px-2 text-sm text-gray-400">Kretsparametrar</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="w-full">
                      <label htmlFor="voltage-slider" className="block text-center text-purple-300 font-semibold mb-1">
                          Spänning: {voltage.toFixed(0)} V
                      </label>
                      <input
                          id="voltage-slider"
                          type="range"
                          min="1"
                          max="24"
                          step="1"
                          value={voltage}
                          onChange={handleVoltageChange}
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-purple-500"
                          aria-label="Reglage för spänning"
                      />
                  </div>
                  <div className="w-full">
                      <label htmlFor="resistance-slider" className="block text-center text-purple-300 font-semibold mb-1">
                          Resistans: {resistance.toFixed(0)} Ω
                      </label>
                      <input
                          id="resistance-slider"
                          type="range"
                          min="1"
                          max="50"
                          step="1"
                          value={resistance}
                          onChange={handleResistanceChange}
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-purple-500"
                          aria-label="Reglage för resistans"
                      />
                  </div>
              </div>
              {circuitType === CircuitType.AC && (
                <div className="mt-4 w-full">
                  <label htmlFor="frequency-slider" className="block text-center text-purple-300 font-semibold mb-1">
                    Frekvens: {frequency.toFixed(1).replace('.', ',')} Hz
                  </label>
                  <input
                    id="frequency-slider"
                    type="range"
                    min="0.2"
                    max="5"
                    step="0.1"
                    value={frequency}
                    onChange={handleFrequencyChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-purple-500"
                    aria-label="Reglage för frekvens"
                  />
                </div>
              )}
              <div className="mt-4 flex flex-col items-center gap-3">
                <button
                  onClick={handlePauseToggle}
                  className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-colors"
                  aria-live="polite"
                >
                  {isPaused ? 'Återuppta' : 'Pausa'}
                </button>
                <div className="mt-1 text-center text-lg font-bold text-yellow-400" aria-live="polite">
                  Strömstyrka (<i>I</i> = <i>U</i>/<i>R</i>): {current.toFixed(2).replace('.', ',')} A
                </div>
              </div>
            </fieldset>
          </div>

          <CircuitDiagram
            circuitType={circuitType}
            showElectrons={displayMode === 'electrons'}
            showCurrentDirection={displayMode === 'current'}
            currentStrength={current}
            acFrequency={frequency}
            isPaused={isPaused}
          />

          <div className="mt-4 p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-center max-w-2xl">
              <h2 className="text-xl font-semibold text-purple-300 mb-2">
                  {circuitType === CircuitType.DC ? 'Likström (DC - Direct Current)' : 'Växelström (AC - Alternating Current)'}
              </h2>
              <p className="text-gray-400">
                  {circuitType === CircuitType.DC
                      ? 'I en likströmskrets flödar elektronerna kontinuerligt i en och samma riktning, från den negativa polen till den positiva. Den konventionella strömriktningen är motsatt, från plus till minus.'
                      : 'I en växelströmskrets byter elektronerna riktning fram och tillbaka i en snabb, oscillerande rörelse. De gör ingen fullständig resa runt kretsen, utan överför energi genom att "knuffa" på varandra.'}
              </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import type { SimulationParams, SimulationResults } from '../types';
import { CelestialBodySelector } from './CelestialBodySelector';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
  disabled: boolean;
  decimalPlaces?: number;
}

const Slider: React.FC<SliderProps> = ({ label, value, min, max, step, unit, onChange, disabled, decimalPlaces = 2 }) => {
  const [inputValue, setInputValue] = useState(value.toFixed(decimalPlaces));

  useEffect(() => {
    // Syncs the input field when the slider is dragged or value is changed externally
    if (parseFloat(inputValue) !== value) {
        setInputValue(value.toFixed(decimalPlaces));
    }
  }, [value, decimalPlaces, inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const processValue = () => {
    let numericValue = parseFloat(inputValue);
    if (isNaN(numericValue)) {
      numericValue = value; // Revert to last valid value if input is not a number
    }

    // Clamp the value to be within min/max
    const clampedValue = Math.max(min, Math.min(max, numericValue));

    onChange(clampedValue); // Update parent state
    setInputValue(clampedValue.toFixed(decimalPlaces)); // Update local state to reflect clamped value
  };

  const handleBlur = () => {
    processValue();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processValue();
      (e.target as HTMLInputElement).blur(); // Remove focus from input
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-slate-300">{label}</label>
        <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 rounded-md">
            <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                className="w-16 bg-transparent text-right pr-1 py-1 text-sm font-semibold text-cyan-300 focus:outline-none appearance-none"
                style={{ MozAppearance: 'textfield' } as React.CSSProperties}
                min={min}
                max={max}
                step={step}
            />
            <span className="text-xs text-slate-400 pr-2 select-none">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        disabled={disabled}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed thumb:bg-cyan-400"
        style={{
            accentColor: '#22d3ee'
        }}
      />
    </div>
  );
};


interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  color: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, color }) => (
  <label className="flex items-center space-x-3 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="form-checkbox h-5 w-5 rounded-md border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-500"
       style={{ accentColor: color }}
    />
    <span className="text-slate-200">{label}</span>
  </label>
);

interface ControlPanelProps {
  params: SimulationParams;
  setParams: React.Dispatch<React.SetStateAction<SimulationParams>>;
  status: 'idle' | 'running' | 'paused' | 'finished';
  results: SimulationResults;
  finishedRunAirResistance: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ params, setParams, status, results, finishedRunAirResistance }) => {
  const isRunning = status === 'running';

  const handleParamChange = <K extends keyof SimulationParams>(key: K, value: SimulationParams[K]) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex-grow space-y-6">
        <h2 className="text-xl font-bold text-center lg:text-left text-slate-100 mt-12 lg:mt-0">Inställningar</h2>

        <div className="space-y-4 p-4 bg-slate-900/50 rounded-lg">
          <Slider
            label="Utkastvinkel"
            value={params.angle}
            min={0}
            max={90}
            step={1}
            unit="°"
            onChange={(v) => handleParamChange('angle', v)}
            disabled={isRunning}
            decimalPlaces={0}
          />
          <Slider
            label="Utgångshastighet"
            value={params.initialVelocity}
            min={1}
            max={30}
            step={1}
            unit="m/s"
            onChange={(v) => handleParamChange('initialVelocity', v)}
            disabled={isRunning}
            decimalPlaces={0}
          />
          <Slider
            label="Utkasthöjd"
            value={params.initialHeight}
            min={0}
            max={20}
            step={0.01}
            unit="m"
            onChange={(v) => handleParamChange('initialHeight', v)}
            disabled={isRunning}
            decimalPlaces={2}
          />
        </div>

        <div className="p-4 bg-slate-900/50 rounded-lg space-y-3">
          <h3 className="text-md font-semibold text-slate-200 mb-2">Visualisering</h3>
          <Checkbox label="Visa koordinataxlar" checked={params.showAxes} onChange={(c) => handleParamChange('showAxes', c)} color="#34d399" />
          <Checkbox label="Hastighet (Total)" checked={params.showV} onChange={(c) => handleParamChange('showV', c)} color="#f472b6" />
          <Checkbox label="Hastighet (x-led)" checked={params.showVx} onChange={(c) => handleParamChange('showVx', c)} color="#facc15" />
          <Checkbox label="Hastighet (y-led)" checked={params.showVy} onChange={(c) => handleParamChange('showVy', c)} color="#a78bfa" />
          {status === 'finished' && !finishedRunAirResistance && (
              <Checkbox
                label="Visa symmetrilinje"
                checked={params.showSymmetryLine}
                onChange={(c) => handleParamChange('showSymmetryLine', c)}
                color="#22d3ee"
              />
            )}
        </div>

        <div className="p-4 bg-slate-900/50 rounded-lg space-y-4">
           <h3 className="text-md font-semibold text-slate-200 mb-3">Fysik</h3>
           <Checkbox label="Luftmotstånd" checked={params.airResistance} onChange={(c) => handleParamChange('airResistance', c)} color="#60a5fa" />
            <div className="pt-2">
             <Slider
                label="Tyngdfaktor (g)"
                value={params.gravity}
                min={0}
                max={30}
                step={0.01}
                unit="m/s²"
                onChange={(v) => handleParamChange('gravity', v)}
                disabled={isRunning}
              />
            </div>
            <CelestialBodySelector
                onSelect={(g) => handleParamChange('gravity', g)}
                currentGravity={params.gravity}
                disabled={isRunning}
            />
        </div>

        {(status === 'finished' || (status === 'idle' && results.flightTime > 0)) && (
            <div className="p-4 bg-slate-900/50 rounded-lg space-y-2 animate-fade-in">
                 <h3 className="text-md font-semibold text-slate-200 mb-2">Resultat</h3>
                 <div className="flex justify-between text-sm"><span className="text-slate-400">Maxhöjd:</span> <span className="font-mono text-cyan-300">{results.maxHeight.toFixed(2)} m</span></div>
                 <div className="flex justify-between text-sm"><span className="text-slate-400">Kastlängd:</span> <span className="font-mono text-cyan-300">{results.range.toFixed(2)} m</span></div>
                 <div className="flex justify-between text-sm"><span className="text-slate-400">Tid i luften:</span> <span className="font-mono text-cyan-300">{results.flightTime.toFixed(2)} s</span></div>
            </div>
        )}

      </div>
    </div>
  );
};

import React from 'react';
import { Slider } from './Slider';

interface ControlsViewProps {
  n1: number;
  setN1: (value: number) => void;
  n2: number;
  setN2: (value: number) => void;
  incidentAngle: number;
  setIncidentAngle: (value: number) => void;
}

export const ControlsView: React.FC<ControlsViewProps> = ({ n1, setN1, n2, setN2, incidentAngle, setIncidentAngle }) => {
  const theta1Rad = incidentAngle * (Math.PI / 180);
  const sinTheta2 = (n1 / n2) * Math.sin(theta1Rad);
  const isTIR = Math.abs(sinTheta2) > 1;
  const theta2 = isTIR ? 0 : -Math.asin(sinTheta2) * (180 / Math.PI);

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 h-full shadow-2xl flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-sky-600 mb-2">Inställningar</h2>
        <p className="text-sm text-slate-600">
          Justera parametrarna med reglagen nedan, eller dra i ljusstrålen för att ändra infallsvinkeln.
        </p>
      </div>

      <div className="space-y-6">
        <Slider
          id="incident-angle"
          label={<>Infallsvinkel (<i>i</i>)</>}
          min={-89.9}
          max={89.9}
          step={0.1}
          value={incidentAngle}
          onChange={(e) => setIncidentAngle(parseFloat(e.target.value))}
          displayPrecision={1}
        />
        <Slider
          id="n2-slider"
          label="Brytningsindex Block (n₂)"
          min={1.00}
          max={2.50}
          step={0.01}
          value={n2}
          onChange={(e) => setN2(parseFloat(e.target.value))}
        />
        <Slider
          id="n1-slider"
          label="Brytningsindex Medium 1 (n₁)"
          min={1.00}
          max={2.50}
          step={0.01}
          value={n1}
          onChange={(e) => setN1(parseFloat(e.target.value))}
        />
      </div>

      <div className="mt-4 pt-6 border-t border-sky-200">
        <h2 className="text-xl font-semibold text-sky-600 mb-4">Snells Lag</h2>
        <div className="bg-sky-50 rounded-lg p-4 text-center">
          <p className="text-lg font-mono text-emerald-600">n₁ sin(<i>i</i>) = n₂ sin(<i>b</i>)</p>
        </div>
      </div>

      <div className="mt-2 space-y-3">
        <div className="flex justify-between items-center bg-sky-100/70 p-3 rounded-lg">
          <span className="text-slate-700">Infallsvinkel (<i>i</i>):</span>
          <span className="font-mono text-lg text-slate-900">{incidentAngle.toFixed(1).replace('.', ',')}°</span>
        </div>
        <div className="flex justify-between items-center bg-sky-100/70 p-3 rounded-lg">
          <span className="text-slate-700">Brytningsvinkel (<i>b</i>):</span>
          {isTIR ? (
            <span className="font-bold text-lg text-red-500">Total intern reflektion</span>
          ) : (
            <span className="font-mono text-lg text-slate-900">{theta2.toFixed(1).replace('.', ',')}°</span>
          )}
        </div>
      </div>
    </div>
  );
};

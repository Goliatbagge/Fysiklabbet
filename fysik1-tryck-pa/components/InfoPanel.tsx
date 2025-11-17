import React from 'react';

interface InfoPanelProps {
  force: number;
  area: number;
  pressure: number;
  isBroken: boolean;
  breakingPoint: number;
  onReset: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({
  force,
  area,
  pressure,
  isBroken,
  breakingPoint,
  onReset
}) => {
  const pressurePercent = Math.min((pressure / breakingPoint) * 100, 100);
  const isOverLimit = pressure > breakingPoint;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-sky-800 animate-fade-in">
      <h2 className="text-xl font-bold mb-4 text-sky-200 border-b border-sky-700 pb-2">Resultat</h2>
      <div className="space-y-3 text-lg">
        <p className="flex justify-between">
          <span className="text-slate-300">Tyngd (F):</span>
          <span className="font-mono">{force.toFixed(0)} N</span>
        </p>
        <p className="flex justify-between">
          <span className="text-slate-300">Area (A):</span>
          <span className="font-mono">{area.toFixed(2)} m²</span>
        </p>
        <p className="flex justify-between items-baseline font-bold text-xl text-sky-100 border-t border-slate-700 pt-3">
          <span className="text-sky-300">Tryck (p):</span>
          <span className="font-mono">{pressure.toFixed(0)} Pa</span>
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-sky-300 mb-2">Isens Hållfasthet</h3>
        <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden border-2 border-slate-600">
          <div
            className={`h-full rounded-full transition-all duration-300 ${isOverLimit ? 'bg-red-500' : 'bg-cyan-400'}`}
            style={{ width: `${pressurePercent}%` }}
          ></div>
        </div>
        <div className="text-xs text-slate-400 text-right mt-1">
            Gräns: {breakingPoint} Pa
        </div>
      </div>

      <div className="mt-6 text-center">
        {isBroken ? (
          <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg">
            <p className="text-2xl font-bold text-red-300 animate-pulse">ISEN SPRACK!</p>
            <p className="text-red-400">Trycket blev för högt.</p>
          </div>
        ) : (
          <div className="p-4 bg-green-900/50 border border-green-700 rounded-lg">
            <p className="text-2xl font-bold text-green-300">Isen håller</p>
            <p className="text-green-400">Trycket är under gränsen.</p>
          </div>
        )}
      </div>

      <button
        onClick={onReset}
        className="w-full mt-6 bg-accent-orange hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300
                   focus:outline-none focus:ring-4 focus:ring-orange-500/50
                   shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Återställ Simulering
      </button>
    </div>
  );
};

export default InfoPanel;

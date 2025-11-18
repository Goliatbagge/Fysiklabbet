import React from 'react';
import { ArrowUp, ArrowDown, Check, RotateCcw, Info, Type } from 'lucide-react';
import { ControlProps } from '../types';

export const UIControls: React.FC<ControlProps> = ({
  currentDirection,
  showFieldLines,
  showFieldDirection,
  showLabels,
  toggleDirection,
  toggleFieldLines,
  toggleFieldDirection,
  toggleLabels,
}) => {
  return (
    <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10 max-w-sm w-full">
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-xl p-6 shadow-2xl text-slate-100">
        <h1 className="text-xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Magnetfält (B) - Rak Ledare
        </h1>
        <p className="text-slate-400 text-sm mb-6">
          Oersteds experiment: Visualisering av högerhandsregeln.
        </p>

        <div className="space-y-6">
          {/* Current Direction Control */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Strömriktning (I)
            </label>
            <button
              onClick={toggleDirection}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 font-medium group ${
                currentDirection === 1
                  ? 'bg-red-500/20 border border-red-500/50 text-red-200 hover:bg-red-500/30'
                  : 'bg-blue-500/20 border border-blue-500/50 text-blue-200 hover:bg-blue-500/30'
              }`}
            >
              <span className="flex items-center gap-2">
                {currentDirection === 1 ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
                {currentDirection === 1 ? 'Ström Uppåt' : 'Ström Nedåt'}
              </span>
              <RotateCcw size={16} className="opacity-50 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>

          {/* Visualization Toggles */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visualisering
            </label>

            <div
                className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors cursor-pointer border border-transparent hover:border-slate-600"
                onClick={toggleFieldLines}
            >
                <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${showFieldLines ? 'bg-blue-500 border-blue-500' : 'border-slate-500'}`}>
                        {showFieldLines && <Check size={14} className="text-white" />}
                    </div>
                    <span className="text-sm">Visa magnetfält (Cirklar)</span>
                </div>
            </div>

            <div
                className={`flex items-center justify-between p-3 rounded-lg bg-slate-700/30 transition-all cursor-pointer border border-transparent ${
                    !showFieldLines ? 'opacity-50 pointer-events-none grayscale' : 'hover:bg-slate-700/50 hover:border-slate-600'
                }`}
                onClick={() => showFieldLines && toggleFieldDirection()}
            >
                <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${showFieldDirection ? 'bg-emerald-500 border-emerald-500' : 'border-slate-500'}`}>
                        {showFieldDirection && <Check size={14} className="text-white" />}
                    </div>
                    <span className="text-sm">Visa fältriktning (Pilar)</span>
                </div>
            </div>

            <div
                className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors cursor-pointer border border-transparent hover:border-slate-600"
                onClick={toggleLabels}
            >
                <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${showLabels ? 'bg-purple-500 border-purple-500' : 'border-slate-500'}`}>
                        {showLabels && <Check size={14} className="text-white" />}
                    </div>
                    <span className="text-sm">Visa beteckningar (I, B)</span>
                </div>
                <Type size={16} className="text-purple-400 opacity-70" />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 pt-4 border-t border-slate-700/50 flex gap-3 items-start text-xs text-slate-400">
          <Info size={16} className="shrink-0 mt-0.5 text-blue-400" />
          <p>
            Enligt <strong>högerhandsregeln</strong>: Om du griper om ledaren med höger hand så att tummen pekar i strömmens riktning, så pekar dina övriga fingrar i magnetfältets riktning.
          </p>
        </div>
      </div>
    </div>
  );
};

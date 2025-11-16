import React from 'react';
import { CELESTIAL_BODIES } from '../constants';

interface CelestialBodySelectorProps {
  onSelect: (gravity: number) => void;
  currentGravity: number;
  disabled: boolean;
}

export const CelestialBodySelector: React.FC<CelestialBodySelectorProps> = ({ onSelect, currentGravity, disabled }) => {
  return (
    <div>
        <p className="text-sm font-medium text-slate-400 mb-3">eller välj en himlakropp:</p>
        <div className="grid grid-cols-5 gap-2">
        {CELESTIAL_BODIES.map((body) => {
            const isSelected = Math.abs(body.gravity - currentGravity) < 0.01;
            return (
            <button
                key={body.name}
                onClick={() => onSelect(body.gravity)}
                disabled={disabled}
                title={`${body.name}: ${body.gravity} m/s²`}
                className="flex flex-col items-center space-y-1.5 rounded-md p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-400 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-800"
            >
                <div
                    className={`w-8 h-8 rounded-full transition-all duration-200 ${isSelected ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-900' : 'ring-1 ring-slate-700'}`}
                    style={{ backgroundImage: body.gradient }}
                />
                <span className="text-[11px] text-center text-slate-300 leading-tight">{body.name}</span>
            </button>
            );
        })}
        </div>
    </div>
  );
};

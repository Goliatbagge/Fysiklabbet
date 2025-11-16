import React from 'react';

interface SliderProps {
  id: string;
  label: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayPrecision?: number;
}

export const Slider: React.FC<SliderProps> = ({ id, label, value, min, max, step, onChange, displayPrecision = 2 }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-sm">
        <label htmlFor={id} className="text-slate-700">{label}</label>
        <span className="font-mono text-sky-700">{value.toFixed(displayPrecision).replace('.', ',')}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
      />
    </div>
  );
};

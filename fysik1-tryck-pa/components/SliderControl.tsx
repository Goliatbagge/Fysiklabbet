import React from 'react';

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const SliderControl: React.FC<SliderControlProps> = ({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  disabled
}) => {
  const isArea = unit === 'm²';
  const displayValue = isArea ? value.toFixed(2) : value.toFixed(0);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-baseline">
        <label className="font-semibold text-lg text-sky-300">{label}</label>
        <span className="text-lg font-mono bg-slate-700 text-white py-1 px-3 rounded">
          {displayValue} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-accent-orange
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:w-5
                   [&::-webkit-slider-thumb]:h-5
                   [&::-webkit-slider-thumb]:bg-accent-orange
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:cursor-pointer
                   [&::-webkit-slider-thumb]:transition-all
                   [&::-webkit-slider-thumb]:shadow-md
                   disabled:[&::-webkit-slider-thumb]:bg-slate-500
                   [&::-moz-range-thumb]:w-5
                   [&::-moz-range-thumb]:h-5
                   [&::-moz-range-thumb]:bg-accent-orange
                   [&::-moz-range-thumb]:rounded-full
                   [&::-moz-range-thumb]:cursor-pointer
                   [&::-moz-range-thumb]:border-none
                   disabled:[&::-moz-range-thumb]:bg-slate-500"
      />
    </div>
  );
};

export default SliderControl;

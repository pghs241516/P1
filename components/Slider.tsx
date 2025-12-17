import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  emoji: string;
}

const Slider: React.FC<SliderProps> = ({ label, value, onChange, emoji }) => {
  return (
    <div className="mb-2">
      <label className="block mb-3 font-semibold text-gray-700 text-lg flex items-center gap-2">
        <span className="text-2xl">{emoji}</span> {label}
      </label>
      <div className="flex items-center gap-5">
        <input
          type="range"
          min="0"
          max="10"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-3 bg-gray-100 rounded-full appearance-none cursor-pointer border border-gray-200"
        />
        <span className="min-w-[44px] text-center font-bold text-2xl text-emerald-600">
          {value}
        </span>
      </div>
    </div>
  );
};

export default Slider;
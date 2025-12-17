import React from 'react';
import { ScoredSeed } from '../types';

interface SeedCardProps {
  seed: ScoredSeed;
  rank: number;
  onMoreInfo: (seed: ScoredSeed) => void;
}

const SeedCard: React.FC<SeedCardProps> = ({ seed, rank, onMoreInfo }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-50 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col h-full group">
      <div className="flex justify-between items-start mb-5">
        <span className="inline-flex items-center justify-center bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
          {rank}위
        </span>
        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
          {seed.name}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6 flex-grow">
        <StatBar label="맛" value={seed.taste} />
        <StatBar label="인기" value={seed.popularity} />
        <StatBar label="건강" value={seed.health} />
        <StatBar label="난이도" value={seed.difficulty} />
      </div>

      <div className="pt-4 mt-auto border-t border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400 text-sm font-medium">일치도</span>
          <span className="text-emerald-600 font-bold text-lg">
            {(seed.similarity * 100).toFixed(0)}%
          </span>
        </div>
        <button 
          onClick={() => onMoreInfo(seed)}
          className="w-full py-3 bg-white border border-emerald-200 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          상세 정보 보기
        </button>
      </div>
    </div>
  );
};

const StatBar: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-gray-400 font-medium">{label}</span>
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-emerald-400 rounded-full" 
        style={{ width: `${value * 10}%` }}
      />
    </div>
  </div>
);

export default SeedCard;
import React, { useEffect, useState } from 'react';
import { Seed } from '../types';
import { getSeedAdvice, getSeedImage } from '../services/geminiService';

interface SeedDetailModalProps {
  seed: Seed | null;
  onClose: () => void;
}

const SeedDetailModal: React.FC<SeedDetailModalProps> = ({ seed, onClose }) => {
  const [advice, setAdvice] = useState<string>('');
  const [loadingAdvice, setLoadingAdvice] = useState<boolean>(false);
  
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);

  useEffect(() => {
    if (seed) {
      setAdvice('');
      setImageSrc(null);
      
      setLoadingAdvice(true);
      getSeedAdvice(seed)
        .then((text) => setAdvice(text))
        .finally(() => setLoadingAdvice(false));

      setLoadingImage(true);
      getSeedImage(seed.name)
        .then((img) => setImageSrc(img))
        .finally(() => setLoadingImage(false));
    }
  }, [seed]);

  if (!seed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden transform transition-all scale-100 max-h-[90vh] overflow-y-auto">
        <div className="bg-emerald-600 p-6 text-white flex justify-between items-center sticky top-0 z-10">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            🌱 {seed.name}
          </h3>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {/* Image Section */}
          <div className="mb-6 rounded-2xl overflow-hidden bg-gray-50 aspect-[4/3] flex items-center justify-center relative border border-gray-100">
            {loadingImage ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                <span className="text-sm text-emerald-600 font-medium animate-pulse">이미지 생성 중...</span>
              </div>
            ) : imageSrc ? (
              <img 
                src={imageSrc} 
                alt={seed.name} 
                className="w-full h-full object-cover animate-fade-in"
              />
            ) : (
              <span className="text-gray-400 text-sm">이미지를 불러올 수 없습니다</span>
            )}
          </div>

          <div className="flex gap-4 mb-8">
            <div className="flex-1 bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-center">
              <div className="text-xs text-emerald-600 font-bold mb-1 uppercase tracking-wide">맛</div>
              <div className="font-extrabold text-emerald-800 text-2xl">{seed.taste}</div>
            </div>
            <div className="flex-1 bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-center">
              <div className="text-xs text-emerald-600 font-bold mb-1 uppercase tracking-wide">난이도</div>
              <div className="font-extrabold text-emerald-800 text-2xl">{seed.difficulty}</div>
            </div>
            <div className="flex-1 bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-center">
              <div className="text-xs text-emerald-600 font-bold mb-1 uppercase tracking-wide">건강</div>
              <div className="font-extrabold text-emerald-800 text-2xl">{seed.health}</div>
            </div>
          </div>

          <div className="min-h-[100px]">
            {loadingAdvice ? (
              <div className="space-y-4 py-2">
                <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse"></div>
              </div>
            ) : (
              <div className="prose prose-emerald max-w-none text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
                {advice}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 sticky bottom-0 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-colors shadow-md shadow-emerald-200"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeedDetailModal;
import React, { useState } from 'react';
import { Seed, ScoredSeed, UserPreferences } from './types';
import { SEEDS_DATA } from './constants';
import Slider from './components/Slider';
import SeedCard from './components/SeedCard';
import SeedDetailModal from './components/SeedDetailModal';

// Cosine similarity utility
function cosineSimilarity(vec1: number[], vec2: number[]): number {
  const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
  const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
  
  if (mag1 === 0 || mag2 === 0) return 0;
  return dotProduct / (mag1 * mag2);
}

const App: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    taste: 5,
    popularity: 5,
    health: 5,
    difficulty: 5,
  });

  const [recommendations, setRecommendations] = useState<ScoredSeed[]>([]);
  const [selectedSeed, setSelectedSeed] = useState<ScoredSeed | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleSliderChange = (key: keyof UserPreferences) => (value: number) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const getRecommendations = () => {
    const userVec = [
      preferences.taste,
      preferences.popularity,
      preferences.health,
      preferences.difficulty
    ];

    const scoredSeeds = SEEDS_DATA.map(seed => {
      const seedVec = [seed.taste, seed.popularity, seed.health, seed.difficulty];
      const similarity = cosineSimilarity(userVec, seedVec);
      return { ...seed, similarity };
    });

    // Sort by similarity descending
    scoredSeeds.sort((a, b) => b.similarity - a.similarity);

    // Take top 10
    setRecommendations(scoredSeeds.slice(0, 10));
    setHasCalculated(true);
    
    // Smooth scroll to results
    setTimeout(() => {
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
            resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4] py-10 px-4 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-800 mb-4 tracking-tight">
            🌱 채소 종자 추천 시스템
          </h1>
          <p className="text-emerald-600/80 text-lg font-medium">
            AI 기반 맞춤형 텃밭 가꾸기 도우미
          </p>
        </header>

        <div className="bg-white rounded-3xl shadow-lg border border-emerald-100 p-8 md:p-10 mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-2">
            <span className="text-emerald-500">✨</span> 선호도 설정
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            <Slider 
              label="맛 (Taste)" 
              value={preferences.taste} 
              onChange={handleSliderChange('taste')} 
              emoji="😋"
            />
            <Slider 
              label="인기 (Popularity)" 
              value={preferences.popularity} 
              onChange={handleSliderChange('popularity')} 
              emoji="🔥"
            />
            <Slider 
              label="건강 (Health)" 
              value={preferences.health} 
              onChange={handleSliderChange('health')} 
              emoji="💪"
            />
            <Slider 
              label="재배 난이도 (Difficulty)" 
              value={preferences.difficulty} 
              onChange={handleSliderChange('difficulty')} 
              emoji="🌾"
            />
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={getRecommendations}
              className="px-12 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-bold rounded-2xl shadow-lg shadow-emerald-200 transform transition hover:-translate-y-1 active:translate-y-0 active:scale-95 duration-200"
            >
              종자 추천받기
            </button>
          </div>
        </div>

        {hasCalculated && (
          <div id="results-section" className="animate-fade-in-up">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800">
                추천 결과 TOP 10
              </h2>
              <div className="h-1 w-20 bg-emerald-400 mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendations.map((seed, index) => (
                <SeedCard 
                  key={seed.name} 
                  seed={seed} 
                  rank={index + 1}
                  onMoreInfo={setSelectedSeed}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <SeedDetailModal 
        seed={selectedSeed} 
        onClose={() => setSelectedSeed(null)} 
      />
      
      <footer className="text-center text-emerald-800/40 mt-12 text-sm">
        <p>© 2024 Smart Vegetable Seed Recommender with Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
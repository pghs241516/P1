export interface Seed {
  name: string;
  taste: number;
  popularity: number;
  health: number;
  difficulty: number;
}

export interface ScoredSeed extends Seed {
  similarity: number;
}

export interface UserPreferences {
  taste: number;
  popularity: number;
  health: number;
  difficulty: number;
}
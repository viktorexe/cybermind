export type GameState = 'playing' | 'won' | 'lost' | 'levelComplete'

export type LetterState = 'correct' | 'present' | 'absent' | 'unknown'

export interface GameStats {
  score: number
  level: number
  lives: number
  timeLeft: number
  hintsUsed: number
}

export interface LetterStates {
  [key: string]: LetterState
}

export interface Guess {
  word: string
  states: LetterState[]
}

export interface WordData {
  word: string
  difficulty: number
  category?: string
}
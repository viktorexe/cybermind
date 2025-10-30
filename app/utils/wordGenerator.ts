import { WordData } from '../types/game'

const WORD_LISTS: { [key: number]: string[] } = {
  1: ['CYBER', 'NEON', 'GLOW', 'CODE', 'HACK', 'BYTE', 'SYNC', 'TECH', 'GRID', 'WAVE'],
  2: ['MATRIX', 'NEURAL', 'BINARY', 'SYSTEM', 'VECTOR', 'PLASMA', 'FUSION', 'CHROME', 'NEXUS', 'PULSE'],
  3: ['QUANTUM', 'DIGITAL', 'NETWORK', 'CIRCUIT', 'VIRTUAL', 'ANDROID', 'SILICON', 'PHOTONS', 'HACKING', 'FIREWALL'],
  4: ['ALGORITHM', 'CYBERNETIC', 'HOLOGRAPHIC', 'ENCRYPTION', 'BIOMETRIC', 'SYNTHETIC', 'INTERFACE', 'MAINFRAME', 'PROCESSOR', 'BANDWIDTH'],
  5: ['NANOTECHNOLOGY', 'CONSCIOUSNESS', 'AUGMENTATION', 'BIOTECHNOLOGY', 'SINGULARITY', 'TRANSCENDENCE', 'CYBERSECURITY', 'NEURALNETWORK', 'ARTIFICIALINTEL', 'QUANTUMCOMPUTE']
}

export function generateWord(level: number): WordData {
  const difficulty = Math.min(Math.ceil(level / 2), 5)
  const wordList = WORD_LISTS[difficulty] || WORD_LISTS[1]
  const randomIndex = Math.floor(Math.random() * wordList.length)
  
  return {
    word: wordList[randomIndex],
    difficulty,
    category: 'cyberpunk'
  }
}

export function getWordLength(level: number): number {
  const difficulty = Math.min(Math.ceil(level / 2), 5)
  return WORD_LISTS[difficulty]?.[0]?.length || 5
}

export function validateGuess(guess: string, targetWord: string): boolean {
  return guess.length === targetWord.length && /^[A-Z]+$/.test(guess)
}
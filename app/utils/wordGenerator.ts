import { WordData } from '../types/game'

const FIVE_LETTER_WORDS = [
  'CYBER', 'NEON', 'GLOW', 'CODE', 'HACK', 'BYTE', 'SYNC', 'TECH', 'GRID', 'WAVE',
  'PIXEL', 'VIRUS', 'ROBOT', 'LASER', 'SPACE', 'POWER', 'LOGIC', 'MAGIC', 'FORCE', 'LIGHT',
  'STORM', 'FLASH', 'SPARK', 'FLAME', 'FROST', 'STEEL', 'STONE', 'BLADE', 'SWORD', 'SHIELD',
  'GHOST', 'DEMON', 'ANGEL', 'BEAST', 'DRAGON', 'EAGLE', 'TIGER', 'SNAKE', 'SHARK', 'WHALE',
  'OCEAN', 'RIVER', 'MOUNT', 'FIELD', 'FOREST', 'DESERT', 'ISLAND', 'VALLEY', 'BRIDGE', 'TOWER',
  'HOUSE', 'CASTLE', 'PALACE', 'TEMPLE', 'CHURCH', 'SCHOOL', 'MARKET', 'GARDEN', 'STREET', 'PLAZA',
  'MUSIC', 'DANCE', 'PAINT', 'WRITE', 'SPEAK', 'THINK', 'DREAM', 'SMILE', 'LAUGH', 'PEACE',
  'HAPPY', 'BRAVE', 'SMART', 'QUICK', 'STRONG', 'CLEAN', 'FRESH', 'SWEET', 'SHARP', 'BRIGHT'
]

export function generateWord(): WordData {
  const randomIndex = Math.floor(Math.random() * FIVE_LETTER_WORDS.length)
  
  return {
    word: FIVE_LETTER_WORDS[randomIndex],
    difficulty: 1,
    category: 'general'
  }
}

export function getWordLength(): number {
  return 5
}

export function validateGuess(guess: string, targetWord: string): boolean {
  return guess.length === targetWord.length && /^[A-Z]+$/.test(guess)
}
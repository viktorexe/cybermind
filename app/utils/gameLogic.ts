import { LetterState, LetterStates } from '../types/game'

export function checkGuess(guess: string, targetWord: string): LetterState[] {
  const result: LetterState[] = new Array(guess.length).fill('absent')
  const targetLetters = targetWord.split('')
  const guessLetters = guess.split('')
  
  // First pass: mark correct positions
  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      result[i] = 'correct'
      targetLetters[i] = ''
      guessLetters[i] = ''
    }
  }
  
  // Second pass: mark present letters
  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] && targetLetters.includes(guessLetters[i])) {
      result[i] = 'present'
      const targetIndex = targetLetters.indexOf(guessLetters[i])
      targetLetters[targetIndex] = ''
    }
  }
  
  return result
}

export function updateLetterStates(
  letterStates: LetterStates,
  guess: string,
  states: LetterState[]
): LetterStates {
  const newStates = { ...letterStates }
  
  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i]
    const state = states[i]
    
    // Only update if the new state is more informative
    if (!newStates[letter] || 
        (newStates[letter] === 'unknown' && state !== 'unknown') ||
        (newStates[letter] === 'absent' && (state === 'present' || state === 'correct')) ||
        (newStates[letter] === 'present' && state === 'correct')) {
      newStates[letter] = state
    }
  }
  
  return newStates
}

export function calculateScore(
  timeLeft: number,
  attempts: number,
  level: number,
  hintsUsed: number
): number {
  const baseScore = 100
  const attemptBonus = Math.max(0, (7 - attempts) * 20)
  const levelMultiplier = level
  const hintPenalty = hintsUsed * 15
  
  return Math.max(10, (baseScore + attemptBonus - hintPenalty) * levelMultiplier)
}

export function getHint(word: string, guesses: string[]): string {
  const usedLetters = new Set(guesses.join('').split(''))
  const availableLetters = word.split('').filter(letter => !usedLetters.has(letter))
  
  if (availableLetters.length === 0) {
    return `Word length: ${word.length} letters`
  }
  
  const randomLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)]
  return `The word contains the letter: ${randomLetter}`
}
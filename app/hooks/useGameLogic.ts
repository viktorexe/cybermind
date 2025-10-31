import { useState, useEffect, useCallback } from 'react'
import { GameState, LetterStates, Guess } from '../types/game'
import { generateWord } from '../utils/wordGenerator'
import { checkGuess, updateLetterStates, calculateScore, getHint } from '../utils/gameLogic'

export function useGameLogic() {
  const [currentWord, setCurrentWord] = useState('')
  const [guesses, setGuesses] = useState<Guess[]>([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [gameState, setGameState] = useState<GameState>('playing')
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(3)
  const [streak, setStreak] = useState(0)
  const [letterStates, setLetterStates] = useState<LetterStates>({})
  const [hintsUsed, setHintsUsed] = useState(0)

  const maxAttempts = 5

  const initializeGame = useCallback(() => {
    const wordData = generateWord()
    setCurrentWord(wordData.word)
    setGuesses([])
    setCurrentGuess('')
    setGameState('playing')
    setLetterStates({})
    setHintsUsed(0)
  }, [])

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  const handleSubmitGuess = useCallback(() => {
    if (currentGuess.length !== currentWord.length || gameState !== 'playing') return

    const guessStates = checkGuess(currentGuess, currentWord)
    const newGuess: Guess = { word: currentGuess, states: guessStates }
    const newGuesses = [...guesses, newGuess]
    
    setGuesses(newGuesses)
    setLetterStates(prev => updateLetterStates(prev, currentGuess, guessStates))
    setCurrentGuess('')

    if (currentGuess === currentWord) {
      const roundScore = calculateScore(0, newGuesses.length, level, hintsUsed)
      setScore(prev => prev + roundScore)
      setStreak(prev => prev + 1)
      setGameState('levelComplete')
    } else if (newGuesses.length >= maxAttempts) {
      setStreak(0)
      setLives(prev => {
        const newLives = prev - 1
        if (newLives <= 0) {
          setGameState('lost')
        } else {
          initializeGame()
        }
        return newLives
      })
    }
  }, [currentGuess, currentWord, gameState, guesses, level, hintsUsed, maxAttempts, initializeGame])

  const handleKeyPress = useCallback((key: string) => {
    if (gameState !== 'playing') return

    if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1))
    } else if (key === 'ENTER') {
      handleSubmitGuess()
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < currentWord.length) {
      setCurrentGuess(prev => prev + key)
    }
  }, [gameState, currentGuess.length, currentWord.length, handleSubmitGuess])

  const handleHint = useCallback(() => {
    if (gameState !== 'playing' || hintsUsed >= 2) return
    
    const hint = getHint(currentWord, guesses.map(g => g.word))
    setHintsUsed(prev => prev + 1)
    
    alert(hint)
  }, [gameState, hintsUsed, currentWord, guesses])

  const resetGame = useCallback(() => {
    setScore(0)
    setLevel(1)
    setStreak(0)
    setLives(3)
    initializeGame()
  }, [initializeGame])

  const nextLevel = useCallback(() => {
    setLevel(prev => prev + 1)
    initializeGame()
  }, [initializeGame])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      try {
        const key = event.key.toUpperCase()
        if (key === 'BACKSPACE' || key === 'ENTER' || /^[A-Z]$/.test(key)) {
          event.preventDefault()
          handleKeyPress(key)
        }
      } catch {
        // Ignore keyboard errors
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyPress])

  return {
    currentWord,
    guesses,
    currentGuess,
    gameState,
    score,
    level,
    lives,
    streak,
    letterStates,
    hintsUsed,
    handleKeyPress,
    handleSubmitGuess,
    handleHint,
    resetGame,
    nextLevel
  }
}
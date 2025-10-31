'use client'

import React from 'react'
import { AnimatePresence } from 'framer-motion'
import GameBoard from './components/GameBoard'
import VirtualKeyboard from './components/VirtualKeyboard'
import GameHeader from './components/GameHeader'
import GameOverModal from './components/GameOverModal'
import { useGameLogic } from './hooks/useGameLogic'
import { useAudioFeedback } from './hooks/useAudioFeedback'

export default function Home() {
  const {
    currentWord,
    guesses,
    currentGuess,
    gameState,
    score,
    level,
    lives,
    streak,
    letterStates,
    handleKeyPress,
    handleSubmitGuess,
    handleHint,
    resetGame,
    nextLevel
  } = useGameLogic()

  const { playSound } = useAudioFeedback()

  const handleKeyboardInput = (key: string) => {
    playSound('keyPress')
    handleKeyPress(key)
  }

  const handleSubmit = () => {
    playSound('submit')
    handleSubmitGuess()
  }

  const handleHintClick = () => {
    playSound('hint')
    handleHint()
  }

  return (
    <div className="game-container">
      <GameHeader 
        score={score}
        level={level}
        lives={lives}
        streak={streak}
        onHint={handleHintClick}
      />
      
      <main className="game-main">
        <GameBoard 
          word={currentWord}
          guesses={guesses}
          currentGuess={currentGuess}
        />
        
        <VirtualKeyboard 
          onKeyPress={handleKeyboardInput}
          onSubmit={handleSubmit}
          letterStates={letterStates}
          disabled={gameState !== 'playing'}
        />
      </main>

      <AnimatePresence>
        {(gameState === 'won' || gameState === 'lost' || gameState === 'levelComplete') && (
          <GameOverModal
            gameState={gameState}
            score={score}
            level={level}
            word={currentWord}
            onRestart={resetGame}
            onNextLevel={nextLevel}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
import React from 'react'
import { motion } from 'framer-motion'
import { GameState } from '../types/game'
import styles from './GameOverModal.module.css'

interface GameOverModalProps {
  gameState: GameState
  score: number
  level: number
  word: string
  onRestart: () => void
  onNextLevel: () => void
}

export default function GameOverModal({ 
  gameState, 
  score, 
  level, 
  word, 
  onRestart, 
  onNextLevel 
}: GameOverModalProps) {
  const getTitle = () => {
    switch (gameState) {
      case 'won': return 'VICTORY!'
      case 'levelComplete': return 'LEVEL COMPLETE!'
      case 'lost': return 'GAME OVER'
      default: return ''
    }
  }

  const getMessage = () => {
    switch (gameState) {
      case 'won': return 'Congratulations! You\'ve mastered the Cyber Arena!'
      case 'levelComplete': return `Word was: ${word}`
      case 'lost': return `The word was: ${word}`
      default: return ''
    }
  }

  const getButtonText = () => {
    switch (gameState) {
      case 'levelComplete': return 'NEXT LEVEL'
      default: return 'PLAY AGAIN'
    }
  }

  const handlePrimaryAction = () => {
    if (gameState === 'levelComplete') {
      onNextLevel()
    } else {
      onRestart()
    }
  }

  const shareScore = async () => {
    const text = `I scored ${score.toLocaleString()} points in Cyber Word Guess Arena! Level ${level} completed. Can you beat my score?`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Cyber Word Guess Arena',
          text,
          url: window.location.href
        })
      } catch {
        // Fallback to clipboard
        navigator.clipboard?.writeText(text)
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard?.writeText(text)
    }
  }

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={styles.modal}
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 50, opacity: 0 }}
        transition={{ duration: 0.4, type: 'spring', damping: 20 }}
      >
        <motion.div
          className={`${styles.title} ${gameState === 'lost' ? styles.lost : styles.success}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {getTitle()}
        </motion.div>

        <motion.div
          className={styles.message}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          {getMessage()}
        </motion.div>

        <motion.div
          className={styles.stats}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <div className={styles.stat}>
            <span className={styles.statLabel}>FINAL SCORE</span>
            <span className={styles.statValue}>{score.toLocaleString()}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>LEVEL REACHED</span>
            <span className={styles.statValue}>{level}</span>
          </div>
        </motion.div>

        <motion.div
          className={styles.actions}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <motion.button
            className={styles.primaryButton}
            onClick={handlePrimaryAction}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {getButtonText()}
          </motion.button>

          <motion.button
            className={styles.secondaryButton}
            onClick={shareScore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            SHARE SCORE
          </motion.button>

          {gameState !== 'levelComplete' && (
            <motion.button
              className={styles.tertiaryButton}
              onClick={onRestart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              RESTART
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
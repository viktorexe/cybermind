import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LetterState, Guess } from '../types/game'
import styles from './GameBoard.module.css'

interface GameBoardProps {
  word: string
  guesses: Guess[]
  currentGuess: string
}

export default function GameBoard({ word, guesses, currentGuess }: GameBoardProps) {
  const maxAttempts = 5
  const wordLength = word.length
  
  const getLetterClass = (state: LetterState) => {
    switch (state) {
      case 'correct': return styles.correct
      case 'present': return styles.present
      case 'absent': return styles.absent
      default: return ''
    }
  }

  const renderRow = (guess: string, states?: LetterState[], isCurrentGuess = false, rowIndex = 0) => {
    const letters = guess.padEnd(wordLength, ' ').split('')
    
    return (
      <motion.div
        key={rowIndex}
        className={styles.row}
        data-length={wordLength}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: rowIndex * 0.1 }}
      >
        {letters.map((letter, index) => (
          <motion.div
            key={`${rowIndex}-${index}`}
            className={`${styles.tile} ${states ? getLetterClass(states[index]) : ''} ${
              isCurrentGuess ? styles.current : ''
            }`}
            initial={{ rotateY: 0 }}
            animate={{ 
              rotateY: states && !isCurrentGuess ? [0, 90, 0] : 0,
              scale: isCurrentGuess && letter !== ' ' ? [1, 1.1, 1] : 1
            }}
            transition={{ 
              duration: states && !isCurrentGuess ? 0.6 : 0.2,
              delay: states && !isCurrentGuess ? index * 0.1 : 0
            }}
          >
            <motion.span
              className={styles.letter}
              initial={{ opacity: 0 }}
              animate={{ opacity: letter !== ' ' ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {letter !== ' ' ? letter : ''}
            </motion.span>
            
            {states && states[index] === 'correct' && (
              <motion.div
                className={styles.correctGlow}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <div className={styles.board}>
      <motion.div
        className={styles.grid}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {/* Completed guesses */}
          {guesses.map((guess, index) => (
            <React.Fragment key={`guess-${index}`}>
              {renderRow(guess.word, guess.states, false, index)}
            </React.Fragment>
          ))}
          
          {/* Current guess row */}
          {guesses.length < maxAttempts && (
            <React.Fragment key={`current-${guesses.length}`}>
              {renderRow(currentGuess, undefined, true, guesses.length)}
            </React.Fragment>
          )}
          
          {/* Empty rows */}
          {Array.from({ length: maxAttempts - guesses.length - 1 }, (_, index) => (
            <React.Fragment key={`empty-${guesses.length + index + 1}`}>
              {renderRow('', undefined, false, guesses.length + index + 1)}
            </React.Fragment>
          ))}
        </AnimatePresence>
      </motion.div>
      
      <motion.div
        className={styles.wordLength}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {wordLength} LETTERS
      </motion.div>
    </div>
  )
}
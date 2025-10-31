import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LetterStates } from '../types/game'
import styles from './VirtualKeyboard.module.css'

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void
  onSubmit: () => void
  letterStates: LetterStates
  disabled: boolean
}

export default function VirtualKeyboard({ onKeyPress, onSubmit, letterStates, disabled }: VirtualKeyboardProps) {
  const hiddenInputRef = useRef<HTMLInputElement>(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
  ]

  useEffect(() => {
    if (isMobile && hiddenInputRef.current) {
      hiddenInputRef.current.focus()
    }
  }, [isMobile])

  const getKeyClass = (key: string) => {
    if (key === 'ENTER' || key === 'BACKSPACE') return styles.actionKey
    
    const state = letterStates[key]
    switch (state) {
      case 'correct': return styles.correct
      case 'present': return styles.present
      case 'absent': return styles.absent
      default: return styles.default
    }
  }

  const handleKeyPress = (key: string) => {
    if (disabled) return
    
    if (key === 'ENTER') {
      onSubmit()
    } else if (key === 'BACKSPACE') {
      onKeyPress('BACKSPACE')
    } else {
      onKeyPress(key)
    }
  }

  const getKeyIcon = (key: string) => {
    if (key === 'BACKSPACE') return '⌫'
    if (key === 'ENTER') return '↵'
    return key
  }

  const handleMobileInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const key = e.key.toUpperCase()
    
    if (key === 'ENTER') {
      onSubmit()
    } else if (key === 'BACKSPACE') {
      onKeyPress('BACKSPACE')
    } else if (/^[A-Z]$/.test(key)) {
      onKeyPress(key)
    }
  }

  const focusHiddenInput = () => {
    if (isMobile && hiddenInputRef.current) {
      hiddenInputRef.current.focus()
    }
  }

  return (
    <>
      {isMobile && (
        <input
          ref={hiddenInputRef}
          type="text"
          style={{
            position: 'absolute',
            left: '-9999px',
            opacity: 0,
            pointerEvents: 'none'
          }}
          onKeyDown={handleMobileInput}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      )}
      
      {isMobile ? (
        <motion.div
          className={styles.mobileTypingArea}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={focusHiddenInput}
        >
          <div className={styles.tapToType}>
            <span>Tap here to type</span>
            <div className={styles.cursor} />
          </div>
        </motion.div>
      ) : (
        <motion.div
          className={styles.keyboard}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
      {rows.map((row, rowIndex) => (
        <motion.div
          key={rowIndex}
          className={styles.row}
          initial={{ x: rowIndex % 2 === 0 ? -20 : 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 + rowIndex * 0.1 }}
        >
          {row.map((key) => (
            <motion.button
              key={key}
              className={`${styles.key} ${getKeyClass(key)} ${disabled ? styles.disabled : ''}`}
              onClick={() => handleKeyPress(key)}
              disabled={disabled}
              whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
              transition={{ duration: 0.1 }}
            >
              <span className={styles.keyText}>
                {getKeyIcon(key)}
              </span>
              
              {letterStates[key] === 'correct' && (
                <motion.div
                  className={styles.correctGlow}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      ))}
        </motion.div>
      )}
    </>
  )
}
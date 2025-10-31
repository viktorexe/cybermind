import React from 'react'
import { motion } from 'framer-motion'
import styles from './GameHeader.module.css'

interface GameHeaderProps {
  score: number
  level: number
  lives: number
  streak: number
  onHint: () => void
}

export default function GameHeader({ score, level, lives, streak, onHint }: GameHeaderProps) {

  return (
    <motion.header 
      className={styles.header}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className={styles.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        WORDLY
      </motion.h1>
      
      <div className={styles.headerContent}>
        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <span className={styles.label}>SCORE</span>
            <motion.span 
              className={styles.value}
              key={score}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {score.toLocaleString()}
            </motion.span>
          </div>
          
          <div className={styles.stat}>
            <span className={styles.label}>LEVEL</span>
            <span className={styles.value}>{level}</span>
          </div>
          
          <div className={styles.stat}>
            <span className={styles.label}>LIVES</span>
            <div className={styles.lives}>
              {Array.from({ length: 3 }, (_, i) => (
                <motion.div
                  key={i}
                  className={`${styles.life} ${i < lives ? styles.active : ''}`}
                  animate={{ 
                    scale: i < lives ? 1 : 0.5,
                    opacity: i < lives ? 1 : 0.3 
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
          
          <div className={styles.stat}>
            <span className={styles.label}>STREAK</span>
            <motion.span 
              className={styles.value}
              key={streak}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {streak}
            </motion.span>
          </div>
        </div>
        
        <motion.button
          className={styles.hintButton}
          onClick={onHint}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          HINT
        </motion.button>
      </div>
    </motion.header>
  )
}
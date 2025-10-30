'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0a'
    }}>
      <motion.div
        style={{
          display: 'flex',
          gap: '0.5rem'
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#00ffff',
              boxShadow: '0 0 10px #00ffff'
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
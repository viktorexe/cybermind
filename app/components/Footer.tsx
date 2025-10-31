import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <span className={styles.credit}>Made by viktorexe</span>
        <div className={styles.links}>
          <a 
            href="https://github.com/viktorexe/neonguess" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.link}
          >
            Source Code
          </a>
        </div>
      </div>
    </footer>
  )
}
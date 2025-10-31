import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Footer.module.css'

export default function Footer() {
  const [activeModal, setActiveModal] = useState<'tos' | 'privacy' | null>(null)

  const closeModal = () => setActiveModal(null)

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.content}>
          <span className={styles.credit}>Made by viktorexe</span>
          <div className={styles.links}>
            <button 
              className={styles.link} 
              onClick={() => setActiveModal('tos')}
            >
              Terms of Service
            </button>
            <button 
              className={styles.link} 
              onClick={() => setActiveModal('privacy')}
            >
              Privacy Policy
            </button>
            <a 
              href="https://github.com/viktorexe/cybermind" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.link}
            >
              Source Code
            </a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {activeModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeButton} onClick={closeModal}>
                ×
              </button>
              
              <div className={styles.modalContent}>
                {activeModal === 'tos' && (
                  <>
                    <h2>Terms of Service</h2>
                    <div className={styles.text}>
                      <p><strong>Last updated:</strong> December 2024</p>
                      
                      <h3>1. Acceptance of Terms</h3>
                      <p>By accessing and using Wordly, you accept and agree to be bound by the terms and provision of this agreement.</p>
                      
                      <h3>2. Use License</h3>
                      <p>Permission is granted to temporarily use Wordly for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
                      
                      <h3>3. Disclaimer</h3>
                      <p>The game is provided "as is" without any representations or warranties, express or implied. We make no representations or warranties in relation to this game or the information and materials provided.</p>
                      
                      <h3>4. Limitations</h3>
                      <p>In no event shall Wordly or its suppliers be liable for any damages arising out of the use or inability to use the game.</p>
                      
                      <h3>5. Fair Play</h3>
                      <p>Users are expected to play fairly and not use automated tools or scripts to solve puzzles.</p>
                      
                      <h3>6. Modifications</h3>
                      <p>We may revise these terms at any time without notice. By using this game, you are agreeing to be bound by the current version of these terms.</p>
                    </div>
                  </>
                )}
                
                {activeModal === 'privacy' && (
                  <>
                    <h2>Privacy Policy</h2>
                    <div className={styles.text}>
                      <p><strong>Last updated:</strong> December 2024</p>
                      
                      <h3>1. Information We Collect</h3>
                      <p>Wordly is designed with privacy in mind. We do not collect, store, or transmit any personal information. All game data is stored locally on your device.</p>
                      
                      <h3>2. Local Storage</h3>
                      <p>The game uses your browser's local storage to save your game progress, statistics, and preferences. This data never leaves your device.</p>
                      
                      <h3>3. No Tracking</h3>
                      <p>We do not use cookies, analytics, or any tracking technologies. Your gameplay is completely private.</p>
                      
                      <h3>4. No Account Required</h3>
                      <p>Wordly does not require account creation or personal information to play.</p>
                      
                      <h3>5. Third-Party Services</h3>
                      <p>This game does not integrate with any third-party services that could access your data.</p>
                      
                      <h3>6. Data Security</h3>
                      <p>Since no data is transmitted or stored on our servers, your privacy is protected by design.</p>
                      
                      <h3>7. Contact</h3>
                      <p>If you have any questions about this Privacy Policy, please contact us through our GitHub repository.</p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
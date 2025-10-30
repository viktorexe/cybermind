import { useCallback } from 'react'

type SoundType = 'keyPress' | 'submit' | 'correct' | 'wrong' | 'hint' | 'levelUp' | 'gameOver'

export function useAudioFeedback() {
  const playSound = useCallback((soundType: SoundType) => {
    // Create audio context for web audio API
    if (typeof window === 'undefined') return

    try {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      
      const createBeep = (frequency: number, duration: number, volume: number = 0.1) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
        oscillator.type = 'sine'
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime)
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01)
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration)
      }

      switch (soundType) {
        case 'keyPress':
          createBeep(800, 0.1, 0.05)
          break
        case 'submit':
          createBeep(600, 0.2, 0.08)
          break
        case 'correct':
          createBeep(1200, 0.3, 0.1)
          setTimeout(() => createBeep(1600, 0.2, 0.08), 100)
          break
        case 'wrong':
          createBeep(300, 0.4, 0.1)
          break
        case 'hint':
          createBeep(1000, 0.15, 0.06)
          setTimeout(() => createBeep(1200, 0.15, 0.06), 150)
          break
        case 'levelUp':
          createBeep(800, 0.2, 0.08)
          setTimeout(() => createBeep(1000, 0.2, 0.08), 200)
          setTimeout(() => createBeep(1200, 0.3, 0.1), 400)
          break
        case 'gameOver':
          createBeep(400, 0.5, 0.1)
          setTimeout(() => createBeep(300, 0.5, 0.08), 250)
          break
      }
    } catch {
      // Fallback for browsers that don't support Web Audio API
      console.log(`Sound: ${soundType}`)
    }
  }, [])

  return { playSound }
}
# Cyber Word Guess Arena

A futuristic word guessing game with cyberpunk aesthetics, built with Next.js, TypeScript, and React.

## Features

- 🎮 **Fast-paced gameplay** with timer-based scoring
- 🌟 **Progressive difficulty** with longer words as you advance
- 💫 **Cyberpunk UI** with neon glow effects and smooth animations
- 📱 **Mobile-first design** optimized for touchscreen interactions
- 🎵 **Audio feedback** using Web Audio API
- 🏆 **Score system** with multipliers and hint penalties
- 🔄 **Lives system** with game over mechanics
- 📤 **Share functionality** for social media

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** with strict mode
- **React 18** with hooks
- **Framer Motion** for animations
- **CSS Modules** for styling
- **Web Audio API** for sound effects

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

Deploy to Vercel with zero configuration:

```bash
vercel --prod
```

The `vercel.json` file is already configured for optimal deployment.

## Game Rules

- Guess the hidden cyberpunk-themed word
- 6 attempts per word
- 3 lives per game
- Timer counts down - faster solves = higher scores
- Use hints (reduces score slightly)
- Progress through levels with increasing difficulty

## Controls

- **Physical Keyboard**: Type letters, Enter to submit, Backspace to delete
- **Virtual Keyboard**: Touch-optimized for mobile devices
- **Hint Button**: Get clues about the word (limited uses)

## Performance

- Zero TypeScript errors in strict mode
- Optimized for 60fps animations
- Mobile-first responsive design
- Efficient re-renders with React hooks
- Lazy loading and code splitting

## Browser Support

- Modern browsers with ES6+ support
- Web Audio API for sound effects
- Touch events for mobile interaction
- Responsive design for all screen sizes
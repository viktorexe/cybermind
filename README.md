# Wordly

A word guessing game inspired by Wordle, but with some extra features I thought would be fun to add.

## What is this?

Basically, you get 5 tries to guess a 5-letter word. Each guess gives you clues about which letters are correct, in the right position, or not in the word at all. Pretty simple concept, but I added some cyberpunk styling because why not?

## Features I built

- Clean, responsive design that works on phones
- Smooth animations (thanks Framer Motion!)
- Audio feedback when you type
- Lives system - you get 3 chances before game over
- Scoring based on how fast you solve it
- Hint system if you get stuck
- Level progression with different words

## Tech stuff

Built with:
- Next.js 14 (love the new app router)
- TypeScript (because I like my code to not break)
- React 18
- Framer Motion for the fancy animations
- CSS Modules for styling

## Running it locally

Clone this repo, then:

```bash
npm install
npm run dev
```

Then go to http://localhost:3000

## How to play

1. Type a 5-letter word
2. Hit enter
3. Green = right letter, right spot
4. Yellow = right letter, wrong spot  
5. Gray = not in the word
6. Repeat until you win or run out of tries

On mobile, just tap the "tap to type" area and your keyboard will pop up.

## Deployment

I set this up to deploy easily on Vercel:

```bash
vercel --prod
```

## Notes

- Works best on modern browsers
- Mobile-friendly (tested on my phone)
- No ads, no tracking, just a simple game
- All game data stays on your device

Feel free to fork it and make it your own!
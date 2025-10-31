import React from 'react'
import type { Metadata } from 'next'
import './styles/globals.css'

export const metadata: Metadata = {
  title: 'Wordly - Daily Word Puzzle Game | Free Online Word Guessing',
  description: 'Play Wordly, the addictive word guessing game! Guess the 5-letter word in 5 tries. Features cyberpunk styling, hints, scoring system, and mobile-friendly design. Play free online now!',
  keywords: 'wordly, word game, puzzle, wordle, guess word, 5 letter word, daily puzzle, brain game, word guessing, free game',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  manifest: '/manifest.json',
  themeColor: '#007bff',
  openGraph: {
    title: 'Wordly - Daily Word Puzzle Game',
    description: 'Play the addictive word guessing game! Guess the 5-letter word in 5 tries with hints and scoring.',
    url: 'https://wordlygame.vercel.app',
    siteName: 'Wordly Game',
    images: [
      {
        url: 'https://wordlygame.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wordly - Word Guessing Game'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wordly - Daily Word Puzzle Game',
    description: 'Play the addictive word guessing game! Guess the 5-letter word in 5 tries.',
    images: ['https://wordlygame.vercel.app/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Game",
              "name": "Wordly - Daily Word Puzzle",
              "description": "Play Wordly, the addictive word guessing game! Guess the 5-letter word in 5 tries.",
              "url": "https://wordlygame.vercel.app",
              "genre": "Word Game",
              "gamePlatform": "Web Browser",
              "operatingSystem": "Any",
              "applicationCategory": "Game",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
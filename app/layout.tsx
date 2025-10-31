import React from 'react'
import type { Metadata } from 'next'
import './styles/globals.css'

export const metadata: Metadata = {
  title: 'Wordly - Daily Word Puzzle',
  description: 'A clean and elegant word guessing game. Guess the 5-letter word in 5 tries!',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  manifest: '/manifest.json',
  themeColor: '#007bff',
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
      <body>{children}</body>
    </html>
  )
}
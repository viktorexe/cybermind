import React from 'react'
import type { Metadata } from 'next'
import './styles/globals.css'

export const metadata: Metadata = {
  title: 'NeonGuess - Cyberpunk Word Arena',
  description: 'A futuristic cyberpunk word guessing game. Crack the 5-letter code in 5 tries!',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  manifest: '/manifest.json',
  themeColor: '#00ffff',
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
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Crosscutter — DSM-5-TR Cross-Cutting Measures',
  description: 'Research tool for administering DSM-5-TR Cross-Cutting Symptom Measures via chatbot',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-background font-sans">{children}</body>
    </html>
  )
}
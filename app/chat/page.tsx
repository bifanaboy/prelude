'use client'

import { ChatInterface } from '@/components/chat/ChatInterface'

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Crosscutter</h1>
          <nav className="flex items-center gap-4">
            <a href="/" className="text-sm font-medium hover:underline">
              Home
            </a>
          </nav>
        </div>
      </header>

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-8">
        <ChatInterface />
      </div>

      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>Crosscutter — MIT License — Personal research use only</p>
        </div>
      </footer>
    </main>
  )
}
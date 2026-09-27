import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Brain, MessageSquare, Mic, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Crosscutter</h1>
          <nav className="flex items-center gap-4">
            <Link href="/assessment" className="text-sm font-medium hover:underline">
              Start Assessment
            </Link>
          </nav>
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-3xl w-full text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
              <Brain className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight">
              DSM-5-TR Cross-Cutting Measures
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A research tool for administering the DSM-5-TR Level 1 and Level 2
              Cross-Cutting Symptom Measures through an interactive, LLM-powered chatbot.
              Designed for personal research use only.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 border rounded-lg bg-card">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-2">Conversational</h3>
              <p className="text-sm text-muted-foreground">
                LLM-guided administration feels like a natural conversation, not a form.
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-card">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-2">Standardized</h3>
              <p className="text-sm text-muted-foreground">
                Faithful implementation of APA DSM-5-TR Level 1 (23 items) and Level 2 measures.
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-card">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-2">Speech-Ready</h3>
              <p className="text-sm text-muted-foreground">
                Planned speech-to-speech interface for hands-free administration.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Link href="/assessment">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Start Assessment
                <MessageSquare className="w-4 h-4" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> Not a clinical or diagnostic tool. Does not replace
              professional clinical judgment. For personal research use only.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>Crosscutter — MIT License — Personal research use only</p>
        </div>
      </footer>
    </main>
  )
}
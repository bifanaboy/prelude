'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Message } from './Message'
import { ChatInput } from './ChatInput'
import { ProgressIndicator } from './ProgressIndicator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle, RefreshCw, CheckCircle2, Loader2 } from 'lucide-react'

interface ChatInterfaceProps {
  initialSessionId?: string
}

export function ChatInterface({ initialSessionId }: ChatInterfaceProps) {
  const [sessionId, setSessionId] = useState<string | null>(initialSessionId || null)
  const [sessionData, setSessionData] = useState<{
    currentMeasure: string
    currentItemIndex: number
    responses: any[]
    level1Scores?: any[]
    triggeredLevel2?: string[]
    level2Progress?: Record<string, number>
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize session on mount
  useEffect(() => {
    async function initSession() {
      if (initialSessionId) {
        try {
          const res = await fetch(`/api/sessions/${initialSessionId}`)
          const data = await res.json()
          if (data.session) {
            setSessionId(initialSessionId)
            setSessionData({
              currentMeasure: data.session.currentMeasure || 'level1',
              currentItemIndex: data.session.currentItemIndex || 0,
              responses: data.session.responses || [],
            })
          }
        } catch (err) {
          console.error('Failed to load session:', err)
        }
      } else {
        // Create new session
        try {
          const res = await fetch('/api/sessions', { method: 'POST' })
          const data = await res.json()
          if (data.session) {
            setSessionId(data.session.id)
            setSessionData({
              currentMeasure: 'level1',
              currentItemIndex: 0,
              responses: [],
            })
            // Send initial message to start the assessment
            sendMessage('Start assessment')
          }
        } catch (err) {
          console.error('Failed to create session:', err)
          setError('Failed to start assessment')
        }
      }
    }
    initSession()
  }, [initialSessionId])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = useCallback(async (content: string) => {
    if (!sessionId) return
    
    setIsLoading(true)
    setError(null)
    setMessages(prev => [...prev, { role: 'user', content }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content }],
          sessionId,
        }),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      // Handle streaming response
      const reader = res.body?.getReader()
      if (!reader) throw new Error('No reader')

      let assistantContent = ''
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = new TextDecoder().decode(value)
        // Parse the streaming response
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.startsWith('0:')) {
            // Text content
            const content = line.slice(2)
            assistantContent += content
            setMessages(prev => {
              const newMessages = [...prev]
              newMessages[newMessages.length - 1] = { 
                role: 'assistant', 
                content: assistantContent 
              }
              return newMessages
            })
          } else if (line.startsWith('9:')) {
            // Tool calls/results - parse if needed
            try {
              const toolData = JSON.parse(line.slice(2))
              if (toolData.toolName === 'presentLevel1Item' || toolData.toolName === 'presentLevel2Item') {
                const result = toolData.result
                setSessionData(prev => prev ? {
                  ...prev,
                  currentItemIndex: result.itemIndex,
                  currentMeasure: toolData.toolName === 'presentLevel1Item' ? 'level1' : result.measureId,
                } : null)
              } else if (toolData.toolName === 'showResults') {
                setIsComplete(true)
                setShowResults(true)
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
      }

      setMessages(prev => {
        const newMessages = [...prev]
        newMessages[newMessages.length - 1] = { 
          role: 'assistant', 
          content: assistantContent 
        }
        return newMessages
      })
    } catch (err) {
      console.error('Chat error:', err)
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setIsLoading(false)
    }
  }, [sessionId, messages])

  const handleSend = useCallback(
    (content: string) => {
      sendMessage(content)
    },
    [sendMessage]
  )

  const handleRestart = useCallback(async () => {
    if (!sessionId) return
    try {
      await fetch(`/api/sessions/${sessionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentMeasure: 'level1',
          currentItemIndex: 0,
          completedAt: null,
        }),
      })
      window.location.reload()
    } catch (err) {
      console.error('Failed to restart:', err)
    }
  }, [sessionId])

  if (!sessionId || !sessionData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  const isLevel1 = sessionData.currentMeasure === 'level1'
  const totalItems = isLevel1 ? 23 : 5 // Simplified for Level 2

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] min-h-[500px]">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
          <Button variant="ghost" size="sm" onClick={() => setError(null)}>
            Dismiss
          </Button>
        </div>
      )}

      <ProgressIndicator
        currentMeasure={sessionData.currentMeasure}
        currentItemIndex={sessionData.currentItemIndex}
        totalItems={totalItems}
        domain={isLevel1 ? undefined : sessionData.currentMeasure.replace('level2_', '')}
      />

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-2 p-4">
            {messages.map((message, index) => (
              <Message
                key={index}
                role={message.role}
                content={message.content}
                isStreaming={isLoading && index === messages.length - 1 && message.role === 'assistant'}
              />
            ))}
            {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && (
              <Message
                role="assistant"
                content=""
                isStreaming={true}
              />
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {showResults && isComplete ? (
        <Card className="mx-4 mb-4">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-green-600 mb-4">
              <CheckCircle2 className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Assessment Complete</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Your assessment has been completed. Results have been saved to your session.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleRestart}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Retake Assessment
              </Button>
              <Button onClick={() => (window.location.href = '/')}>
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="p-4 border-t">
          <ChatInput
            onSend={handleSend}
            disabled={isLoading}
            placeholder={isLoading ? 'Waiting for response...' : 'Type your response (0-4)...'}
            showVoiceButton={false}
          )}
        </div>
      )}
    </div>
  )
}
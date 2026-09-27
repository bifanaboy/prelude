'use client'

import { cn } from '@/lib/utils'
import { Bot, User, Loader2 } from 'lucide-react'

interface MessageProps {
  role: 'user' | 'assistant' | 'system' | 'tool'
  content: string
  isStreaming?: boolean
}

export function Message({ role, content, isStreaming }: MessageProps) {
  const isUser = role === 'user'
  const isAssistant = role === 'assistant'

  return (
    <div
      className={cn(
        'flex gap-3 px-4 py-2 max-w-3xl',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}
      <div
        className={cn(
          'relative rounded-2xl px-4 py-2 max-w-[70%]',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-muted text-muted-foreground rounded-bl-md'
        )}
      >
        <p className="whitespace-pre-wrap">{content}</p>
        {isStreaming && isAssistant && (
          <span className="flex items-center gap-1 text-xs opacity-60 mt-1">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>Generating...</span>
          </span>
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
    </div>
  )
}
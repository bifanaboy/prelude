'use client'

import { useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, Mic, MicOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
  showVoiceButton?: boolean
  isRecording?: boolean
  onVoiceToggle?: () => void
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Type your response...',
  showVoiceButton = false,
  isRecording = false,
  onVoiceToggle,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const textarea = textareaRef.current
      if (!textarea || !textarea.value.trim()) return

      onSend(textarea.value.trim())
      textarea.value = ''
      textarea.style.height = 'auto'
    },
    [onSend]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit(e)
      }
    },
    [handleSubmit]
  )

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`
  }, [])

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            placeholder={placeholder}
            disabled={disabled}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            className="pr-12 min-h-[44px] max-h-[120px] resize-none"
            rows={1}
          />
        </div>
        <div className="flex items-center gap-1">
          {showVoiceButton && onVoiceToggle && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onVoiceToggle}
              disabled={disabled}
              className={cn(isRecording && 'bg-red-500 text-white border-red-500')}
              aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
          )}
          <Button
            type="submit"
            size="icon"
            disabled={disabled}
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </form>
  )
}
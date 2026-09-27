import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { runAssessmentChat } from '@/lib/llm/assessment'
import { prisma } from '@/lib/db/prisma'
import { Response as ResponseType } from '@/types'

export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const { messages, sessionId } = await req.json()

    if (!sessionId) {
      return new Response('Session ID required', { status: 400 })
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { responses: true },
    })

    if (!session) {
      return new Response('Session not found', { status: 404 })
    }

    const responses: ResponseType[] = session.responses.map(r => ({
      itemId: r.itemId,
      value: r.value,
      domain: r.domain,
      measure: r.measure,
    }))

    const sessionData = {
      currentMeasure: session.currentMeasure || 'level1',
      currentItemIndex: session.currentItemIndex,
      responses,
      level1Scores: undefined,
      triggeredLevel2: undefined,
      level2Progress: undefined,
    }

    const result = await runAssessmentChat(messages, sessionData)

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
import { openai } from '@ai-sdk/openai'
import { streamText, tool } from 'ai'
import { z } from 'zod'
import { LEVEL1_MEASURE, LEVEL1_DOMAIN_LABELS, LEVEL1_DOMAIN_TO_LEVEL2, LEVEL1_THRESHOLD_FOR_LEVEL2 } from '@/lib/measures/level1'
import { LEVEL2_MEASURES, LEVEL2_DOMAIN_LABELS } from '@/lib/measures/level2'
import { calculateDomainScores, shouldTriggerLevel2 } from '@/lib/scoring'
import { Response as ResponseType } from '@/types'

const measureTools = {
  presentLevel1Item: tool({
    description: 'Present the next Level 1 item to the user',
    parameters: z.object({
      itemIndex: z.number().describe('Zero-based index of the item to present'),
      itemText: z.string().describe('The question text'),
      domain: z.string().describe('The domain this item belongs to'),
      totalItems: z.number().describe('Total number of items in the measure'),
      progress: z.number().describe('Progress percentage 0-100'),
    }),
    execute: async ({ itemIndex, itemText, domain, totalItems, progress }) => {
      return { itemIndex, itemText, domain, totalItems, progress }
    },
  }),
  presentLevel2Item: tool({
    description: 'Present the next Level 2 item for a specific domain',
    parameters: z.object({
      measureId: z.string().describe('The Level 2 measure ID'),
      itemIndex: z.number().describe('Zero-based index of the item'),
      itemText: z.string().describe('The question text'),
      totalItems: z.number().describe('Total items in this measure'),
      progress: z.number().describe('Progress percentage 0-100'),
    }),
    execute: async ({ measureId, itemIndex, itemText, totalItems, progress }) => {
      return { measureId, itemIndex, itemText, totalItems, progress }
    },
  }),
  showResults: tool({
    description: 'Display assessment results',
    parameters: z.object({
      level1Scores: z.array(z.object({
        domain: z.string(),
        rawScore: z.number(),
        severity: z.string(),
      })),
      level2Scores: z.array(z.object({
        measureId: z.string(),
        domain: z.string(),
        rawScore: z.number(),
        severity: z.string(),
      })).optional(),
      triggeredLevel2: z.array(z.string()).optional(),
    }),
    execute: async ({ level1Scores, level2Scores, triggeredLevel2 }) => {
      return { level1Scores, level2Scores, triggeredLevel2 }
    },
  }),
}

export async function runAssessmentChat(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  sessionData: {
    currentMeasure: string
    currentItemIndex: number
    responses: ResponseType[]
    level1Scores?: Array<{ domain: string; rawScore: number; severity: string }>
    triggeredLevel2?: string[]
    level2Progress?: Record<string, number>
  }
) {
  const { currentMeasure, currentItemIndex, responses, level1Scores, triggeredLevel2, level2Progress } = sessionData

  const systemPrompt = `You are administering the DSM-5-TR Cross-Cutting Symptom Measures.
  
Current state:
- Measure: ${currentMeasure}
- Item index: ${currentItemIndex}
- Responses collected: ${responses.length}

Guidelines:
1. Present items ONE AT A TIME using the appropriate tool
2. Wait for user response (0-4 scale) before moving to next item
3. For Level 1: 23 items across 13 domains
4. After Level 1 complete: calculate scores, determine which Level 2 measures to administer
5. Administer triggered Level 2 measures sequentially
6. At the end, show results using showResults tool

Item response scale:
0 = None (Not at all)
1 = Slight (Rare, less than a day or two)
2 = Mild (Several days)
3 = Moderate (More than half the days)
4 = Severe (Nearly every day)

Be empathetic, professional, and clear. Explain the scale when starting.`

  let currentItem: { text: string; domain: string; id: string } | null = null
  let measure = LEVEL1_MEASURE
  let totalItems = LEVEL1_MEASURE.items.length

  if (currentMeasure.startsWith('level2_')) {
    const level2Measure = LEVEL2_MEASURES[currentMeasure]
    if (level2Measure) {
      measure = level2Measure
      totalItems = measure.items.length
      if (currentItemIndex < totalItems) {
        currentItem = measure.items[currentItemIndex]
      }
    }
  } else if (currentItemIndex < LEVEL1_MEASURE.items.length) {
    currentItem = LEVEL1_MEASURE.items[currentItemIndex]
  }

  const tools = { ...measureTools }

  if (currentMeasure === 'level1' && currentItemIndex >= LEVEL1_MEASURE.items.length) {
    // Level 1 complete, calculate scores and determine Level 2
    const scores = calculateDomainScores(LEVEL1_MEASURE, responses)
    const triggered = shouldTriggerLevel2(scores, LEVEL1_THRESHOLD_FOR_LEVEL2)
    
    return streamText({
      model: openai('gpt-4o'),
      system: `${systemPrompt}\n\nLevel 1 complete. Triggered Level 2 measures: ${triggered.join(', ') || 'none'}. Use showResults tool.`,
      messages,
      tools,
      toolChoice: 'required',
      maxSteps: 5,
    })
  }

  if (currentMeasure.startsWith('level2_')) {
    const level2Measure = LEVEL2_MEASURES[currentMeasure]
    if (!level2Measure || currentItemIndex >= level2Measure.items.length) {
      // This Level 2 measure complete
      const scores = calculateDomainScores(level2Measure!, responses.filter(r => r.measure === currentMeasure))
      // Check if more Level 2 measures to administer
      const remaining = triggeredLevel2?.filter(d => 
        (level2Progress?.[LEVEL1_DOMAIN_TO_LEVEL2[d]] ?? 0) < (LEVEL2_MEASURES[LEVEL1_DOMAIN_TO_LEVEL2[d]]?.items.length ?? 0)
      ) || []
      
      if (remaining.length > 0) {
        const nextDomain = remaining[0]
        const nextMeasureId = LEVEL1_DOMAIN_TO_LEVEL2[nextDomain]
        return streamText({
          model: openai('gpt-4o'),
          system: `${systemPrompt}\n\nLevel 2 ${LEVEL2_DOMAIN_LABELS[currentMeasure]} complete. Moving to ${LEVEL2_DOMAIN_LABELS[nextMeasureId]}.`,
          messages,
          tools,
          toolChoice: 'required',
          maxSteps: 5,
        })
      } else {
        // All done
        const allLevel2Scores: Array<{ measureId: string; domain: string; rawScore: number; severity: string }> = []
        for (const domain of triggeredLevel2 || []) {
          const measureId = LEVEL1_DOMAIN_TO_LEVEL2[domain]
          const measure = LEVEL2_MEASURES[measureId]
          if (measure) {
            const scores = calculateDomainScores(measure, responses.filter(r => r.measure === measureId))
            for (const s of scores) {
              allLevel2Scores.push({ measureId, domain: s.domain, rawScore: s.rawScore, severity: s.severity })
            }
          }
        }
        return streamText({
          model: openai('gpt-4o'),
          system: `${systemPrompt}\n\nAll measures complete. Use showResults tool.`,
          messages,
          tools: { showResults: measureTools.showResults },
          toolChoice: 'required',
          maxSteps: 5,
        })
      }
    }
  }

  if (currentItem) {
    const progress = Math.round(((currentItemIndex + 1) / totalItems) * 100)
    const toolName = currentMeasure === 'level1' ? 'presentLevel1Item' : 'presentLevel2Item'
    
    return streamText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      messages,
      tools: { [toolName]: measureTools[toolName] },
      toolChoice: 'required',
      maxSteps: 5,
    })
  }

  return streamText({
    model: openai('gpt-4o'),
    system: systemPrompt,
    messages,
    tools: { showResults: measureTools.showResults },
    toolChoice: 'required',
    maxSteps: 5,
  })
}
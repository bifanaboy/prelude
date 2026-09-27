import { describe, it, expect } from 'vitest'
import { LEVEL1_MEASURE } from '@/lib/measures/level1'
import { calculateDomainScores, shouldTriggerLevel2, LEVEL1_THRESHOLD_FOR_LEVEL2 } from '@/lib/scoring'
import { Response as ResponseType } from '@/types'

describe('Scoring Engine', () => {
  describe('calculateDomainScores', () => {
    it('calculates correct raw scores for each domain', () => {
      const responses: ResponseType[] = [
        { itemId: 'LEVEL1_01', value: 2, domain: 'depression' },
        { itemId: 'LEVEL1_02', value: 3, domain: 'depression' },
        { itemId: 'LEVEL1_03', value: 1, domain: 'anger' },
        { itemId: 'LEVEL1_04', value: 0, domain: 'mania' },
        { itemId: 'LEVEL1_05', value: 0, domain: 'mania' },
        { itemId: 'LEVEL1_06', value: 2, domain: 'anxiety' },
        { itemId: 'LEVEL1_07', value: 1, domain: 'anxiety' },
        { itemId: 'LEVEL1_08', value: 0, domain: 'anxiety' },
      ]

      const scores = calculateDomainScores(LEVEL1_MEASURE, responses)

      const depressionScore = scores.find(s => s.domain === 'depression')
      expect(depressionScore?.rawScore).toBe(5)
      expect(depressionScore?.severity).toBe('mild')

      const angerScore = scores.find(s => s.domain === 'anger')
      expect(angerScore?.rawScore).toBe(1)
      expect(angerScore?.severity).toBe('slight')

      const maniaScore = scores.find(s => s.domain === 'mania')
      expect(maniaScore?.rawScore).toBe(0)
      expect(maniaScore?.severity).toBe('none')

      const anxietyScore = scores.find(s => s.domain === 'anxiety')
      expect(anxietyScore?.rawScore).toBe(3)
      expect(anxietyScore?.severity).toBe('slight')
    })

    it('handles empty responses', () => {
      const scores = calculateDomainScores(LEVEL1_MEASURE, [])
      expect(scores).toHaveLength(0)
    })

    it('calculates severe correctly', () => {
      const responses: ResponseType[] = [
        { itemId: 'LEVEL1_11', value: 4, domain: 'suicidal_ideation' },
      ]
      const scores = calculateDomainScores(LEVEL1_MEASURE, responses)
      const siScore = scores.find(s => s.domain === 'suicidal_ideation')
      expect(siScore?.severity).toBe('severe')
    })
  })

  describe('shouldTriggerLevel2', () => {
    it('triggers Level 2 for domains meeting threshold', () => {
      const level1Scores = [
        { domain: 'depression', rawScore: 5, severity: 'mild' as const },
        { domain: 'anxiety', rawScore: 3, severity: 'slight' as const },
        { domain: 'suicidal_ideation', rawScore: 1, severity: 'slight' as const },
        { domain: 'anger', rawScore: 0, severity: 'none' as const },
      ]

      const triggered = shouldTriggerLevel2(level1Scores, LEVEL1_THRESHOLD_FOR_LEVEL2)

      expect(triggered).toContain('depression')
      expect(triggered).toContain('anxiety')
      expect(triggered).toContain('suicidal_ideation')
      expect(triggered).not.toContain('anger')
    })

    it('does not trigger for domains below threshold', () => {
      const level1Scores = [
        { domain: 'depression', rawScore: 2, severity: 'slight' as const },
        { domain: 'anger', rawScore: 1, severity: 'slight' as const },
      ]

      const triggered = shouldTriggerLevel2(level1Scores, LEVEL1_THRESHOLD_FOR_LEVEL2)

      expect(triggered).not.toContain('depression')
      expect(triggered).not.toContain('anger')
    })
  })
})
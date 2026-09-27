export interface MeasureItem {
  id: string
  text: string
  domain: string
  reverseScored?: boolean
}

export interface Measure {
  id: string
  name: string
  description: string
  items: MeasureItem[]
  domains: string[]
  scoring: ScoringRules
}

export interface ScoringRules {
  domainThresholds: Record<string, DomainThresholds>
}

export interface DomainThresholds {
  none: [number, number]
  slight: [number, number]
  mild: [number, number]
  moderate: [number, number]
  severe: [number, number]
}

export interface Response {
  itemId: string
  value: number
  domain: string
  measure: string
}

export interface Session {
  id: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  currentMeasure: string
  currentItemIndex: number
  responses: Response[]
}

export interface Score {
  domain: string
  rawScore: number
  severity: 'none' | 'slight' | 'mild' | 'moderate' | 'severe'
}

export type LikertValue = 0 | 1 | 2 | 3 | 4

export const LIKERT_LABELS: Record<LikertValue, string> = {
  0: 'None',
  1: 'Slight',
  2: 'Mild',
  3: 'Moderate',
  4: 'Severe',
}

export const LIKERT_DESCRIPTIONS: Record<LikertValue, string> = {
  0: 'Not at all',
  1: 'Rare, less than a day or two',
  2: 'Several days',
  3: 'More than half the days',
  4: 'Nearly every day',
}
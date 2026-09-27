import { Measure, Response, Score, DomainThresholds } from '@/types'
import { LEVEL1_THRESHOLD_FOR_LEVEL2 } from '@/lib/measures/level1'

export { LEVEL1_THRESHOLD_FOR_LEVEL2 }

export function calculateDomainScores(
  measure: Measure,
  responses: Response[]
): Score[] {
  const domainResponses = new Map<string, Response[]>();

  for (const response of responses) {
    const existing = domainResponses.get(response.domain) || [];
    existing.push(response);
    domainResponses.set(response.domain, existing);
  }

  const scores: Score[] = [];

  domainResponses.forEach((domainResps: Response[], domain: string) => {
    const rawScore = domainResps.reduce((sum: number, r: Response) => sum + r.value, 0);
    const severity = calculateSeverity(measure.scoring.domainThresholds[domain], rawScore);

    scores.push({
      domain,
      rawScore,
      severity,
    });
  });

  return scores;
}

function calculateSeverity(
  thresholds: DomainThresholds | undefined,
  rawScore: number
): 'none' | 'slight' | 'mild' | 'moderate' | 'severe' {
  if (!thresholds) return 'none';

  if (rawScore >= thresholds.severe[0] && rawScore <= thresholds.severe[1]) return 'severe';
  if (rawScore >= thresholds.moderate[0] && rawScore <= thresholds.moderate[1]) return 'moderate';
  if (rawScore >= thresholds.mild[0] && rawScore <= thresholds.mild[1]) return 'mild';
  if (rawScore >= thresholds.slight[0] && rawScore <= thresholds.slight[1]) return 'slight';
  return 'none';
}

export function shouldTriggerLevel2(
  level1Scores: Score[],
  thresholdMap: Record<string, 'slight' | 'mild'>
): string[] {
  const severityOrder = ['none', 'slight', 'mild', 'moderate', 'severe'];
  const triggered: string[] = [];

  for (const score of level1Scores) {
    const threshold = thresholdMap[score.domain];
    if (!threshold) continue;

    const thresholdIndex = severityOrder.indexOf(threshold);
    const scoreIndex = severityOrder.indexOf(score.severity);

    if (scoreIndex >= thresholdIndex) {
      triggered.push(score.domain);
    }
  }

  return triggered;
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'none': return 'text-green-600 bg-green-100';
    case 'slight': return 'text-yellow-600 bg-yellow-100';
    case 'mild': return 'text-orange-600 bg-orange-100';
    case 'moderate': return 'text-red-600 bg-red-100';
    case 'severe': return 'text-red-800 bg-red-200';
    default: return 'text-gray-600 bg-gray-100';
  }
}

export function getSeverityLabel(severity: string): string {
  return severity.charAt(0).toUpperCase() + severity.slice(1);
}
'use client'

import { cn } from '@/lib/utils'
import { LEVEL1_DOMAIN_LABELS } from '@/lib/measures/level1'

interface ProgressIndicatorProps {
  currentMeasure: string
  currentItemIndex: number
  totalItems: number
  domain?: string
}

export function ProgressIndicator({
  currentMeasure,
  currentItemIndex,
  totalItems,
  domain,
}: ProgressIndicatorProps) {
  const progress = totalItems > 0 ? ((currentItemIndex + 1) / totalItems) * 100 : 0
  const isLevel1 = currentMeasure === 'level1'
  const measureLabel = isLevel1 ? 'Level 1' : `Level 2: ${domain || 'Unknown'}`

  return (
    <div className="space-y-2 px-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{measureLabel}</span>
        <span className="text-muted-foreground">
          Item {currentItemIndex + 1} of {totalItems}
        </span>
      </div>
      {domain && LEVEL1_DOMAIN_LABELS[domain] && (
        <div className="text-xs text-muted-foreground">
          Domain: {LEVEL1_DOMAIN_LABELS[domain]}
        </div>
      )}
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
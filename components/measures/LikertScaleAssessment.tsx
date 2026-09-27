'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { LEVEL1_MEASURE, LEVEL1_DOMAIN_LABELS } from '@/lib/measures/level1'
import { LIKERT_LABELS, LIKERT_DESCRIPTIONS, LikertValue } from '@/types'
import { calculateDomainScores, getSeverityColor, getSeverityLabel } from '@/lib/scoring'
import { Response as ResponseType } from '@/types'
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'

export function LikertScaleAssessment() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, LikertValue>>({})
  const [showResults, setShowResults] = useState(false)
  const [scores, setScores] = useState<ReturnType<typeof calculateDomainScores> | null>(null)

  const item = LEVEL1_MEASURE.items[currentIndex]
  const progress = ((currentIndex + 1) / LEVEL1_MEASURE.items.length) * 100
  const isComplete = currentIndex === LEVEL1_MEASURE.items.length - 1 && responses[item.id] !== undefined

  const handleResponse = (value: LikertValue) => {
    setResponses(prev => ({ ...prev, [item.id]: value }))
    if (currentIndex < LEVEL1_MEASURE.items.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 150)
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    const responseList: ResponseType[] = Object.entries(responses).map(([itemId, value]) => {
      const item = LEVEL1_MEASURE.items.find(i => i.id === itemId)!
      return { itemId, value, domain: item.domain, measure: 'level1' }
    })
    const calculatedScores = calculateDomainScores(LEVEL1_MEASURE, responseList)
    setScores(calculatedScores)
    setShowResults(true)
  }

  if (showResults && scores) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              Assessment Complete
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Level 1 Results</h3>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {scores.map(score => (
                  <Card key={score.domain} className={getSeverityColor(score.severity)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{LEVEL1_DOMAIN_LABELS[score.domain]}</span>
                        <span className="font-bold">{score.rawScore}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${getSeverityColor(score.severity).replace('bg-', 'bg-').replace('text-', 'text-')}`}>
                          {getSeverityLabel(score.severity)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => { setShowResults(false); setResponses({}); setCurrentIndex(0); }}>
                Retake Assessment
              </Button>
              <Button onClick={() => window.location.href = '/'}>
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{LEVEL1_MEASURE.name}</h2>
        <div className="text-sm text-muted-foreground">
          Item {currentIndex + 1} of {LEVEL1_MEASURE.items.length}
        </div>
      </div>

      <Progress value={progress} className="h-3" />

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              During the past <strong>TWO (2) WEEKS</strong>, how much have you been bothered by:
            </p>
            <p className="text-xl font-medium">{item.text}</p>
            <p className="text-sm text-muted-foreground">{LEVEL1_DOMAIN_LABELS[item.domain]}</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-sm font-medium">Select your response:</Label>
            <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label="Likert scale response">
              {([0, 1, 2, 3, 4] as LikertValue[]).map(value => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={responses[item.id] === value}
                  onClick={() => handleResponse(value)}
                  className={`relative aspect-square rounded-lg border-2 transition-all flex flex-col items-center justify-center p-2 ${
                    responses[item.id] === value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 hover:bg-accent'
                  }`}
                >
                  <span className="text-2xl font-bold">{value}</span>
                  <span className="text-xs text-center mt-1">{LIKERT_LABELS[value]}</span>
                  <span className="text-[10px] text-muted-foreground text-center">{LIKERT_DESCRIPTIONS[value]}</span>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentIndex === 0}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <Button
              onClick={isComplete ? handleSubmit : () => {}}
              disabled={responses[item.id] === undefined && !isComplete}
              className="ml-auto"
            >
              {isComplete ? (
                <>
                  Submit Assessment
                  <CheckCircle className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        <strong>Disclaimer:</strong> This is not a clinical or diagnostic tool. For personal research use only.
      </p>
    </div>
  )
}
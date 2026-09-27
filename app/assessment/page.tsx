'use client'

import { LikertScaleAssessment } from '@/components/measures/LikertScaleAssessment'

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <LikertScaleAssessment />
      </div>
    </main>
  )
}
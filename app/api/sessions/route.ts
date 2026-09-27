import { prisma } from '@/lib/db/prisma'
import { LEVEL1_MEASURE } from '@/lib/measures/level1'

export async function POST() {
  try {
    const session = await prisma.session.create({
      data: {
        currentMeasure: 'level1',
        currentItemIndex: 0,
      },
    })

    return Response.json({ session })
  } catch (error) {
    console.error('Create session error:', error)
    return Response.json({ error: 'Failed to create session' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const sessions = await prisma.session.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        scores: true,
        _count: { select: { responses: true } },
      },
    })

    return Response.json({ sessions })
  } catch (error) {
    console.error('List sessions error:', error)
    return Response.json({ error: 'Failed to list sessions' }, { status: 500 })
  }
}
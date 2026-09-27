import { prisma } from '@/lib/db/prisma'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await prisma.session.findUnique({
      where: { id },
      include: {
        responses: { orderBy: { createdAt: 'asc' } },
        scores: true,
      },
    })

    if (!session) {
      return Response.json({ error: 'Session not found' }, { status: 404 })
    }

    return Response.json({ session })
  } catch (error) {
    console.error('Get session error:', error)
    return Response.json({ error: 'Failed to get session' }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    const session = await prisma.session.update({
      where: { id },
      data: {
        currentMeasure: body.currentMeasure,
        currentItemIndex: body.currentItemIndex,
        completedAt: body.completedAt ? new Date(body.completedAt) : undefined,
      },
      include: {
        responses: { orderBy: { createdAt: 'asc' } },
        scores: true,
      },
    })

    return Response.json({ session })
  } catch (error) {
    console.error('Update session error:', error)
    return Response.json({ error: 'Failed to update session' }, { status: 500 })
  }
}
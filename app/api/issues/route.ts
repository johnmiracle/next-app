import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
import prisma from '@/prisma/client'

const createIssuesSchema = z.object({
    title: z.string().min(1).max(255),
    descripion: z.string().min(1)
})

export async function POST(request: NextRequest) {
    const body = await request.json()

    const validation = createIssuesSchema.safeParse(body)

    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.descripion }
    })

    return NextResponse.json(newIssue, { status: 201 })
}
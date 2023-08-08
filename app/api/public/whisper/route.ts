// URL: /api/public/whisper
import prisma from '@/app/libs/prismaConn';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
// Get all user whispers with author information (including username)
export const GET = async () => {
  try {
    const allWhispers = await prisma.whisper.findMany({
      include: {
        author: {
          select: {
            username: true,
            name: true,
            image: true,
          },
        },
        comments: {
          select: {
            id: true,
            title: true,
            createdAt: true,
            user: {
              select: {
                username: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ whispers: allWhispers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

// URL: /api/public/whisper/:id

import prisma from '@/app/libs/prismaConn';
import { NextRequest, NextResponse } from 'next/server';

// Get whisper with ID
export const GET = async (request: NextRequest, { params }: any) => {
  try {
    const whisperId = params.id;
    const whisper = await prisma.whisper.findUnique({
      where: { id: whisperId },
      include: {
        author: {
          select: {
            username: true,
            name: true,
          },
        },
      },
    });

    if (!whisper) {
      return NextResponse.json(
        { message: "Couldn't find the whisper" },
        { status: 404 }
      );
    }

    return NextResponse.json(whisper, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred while retrieving the whisper' },
      { status: 500 }
    );
  }
};

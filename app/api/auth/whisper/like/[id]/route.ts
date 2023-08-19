// URL: /api/auth/whisper/like/id

import prisma from '@/app/libs/prismaConn';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOpstions } from '../../../[...nextauth]/route';

// update whisper

export const POST = async (request: NextRequest, { params }: any) => {
  try {
    const session = await getServerSession(authOpstions);
    const whisperId = params.id;

    if (!session)
      return NextResponse.json(
        { message: 'Not Authenticaded' },
        { status: 400 }
      );

    const authorId = session.user.id;

    // Check if the user has already liked the whisper
    const existingLike = await prisma.like.findFirst({
      where: {
        authorId,
        whisperId,
      },
    });

    if (existingLike) {
      return NextResponse.json(
        {
          message: 'User has already liked this whisper.',
        },
        { status: 400 }
      );
    }

    const createdLike = await prisma.like.create({
      data: {
        user: { connect: { id: authorId } },
        whisper: { connect: { id: whisperId } },
      },
    });

    return NextResponse.json({ message: 'You have liked this whisper' });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

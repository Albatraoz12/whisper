// URL: /api/auth/whisper/like/id

import prisma from '@/app/libs/prismaConn';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOpstions } from '../../../[...nextauth]/route';

export const POST = async (request: NextRequest, { params }: any) => {
  try {
    const session = await getServerSession(authOpstions);
    const whisperId = params.id;

    if (!session)
      return NextResponse.json(
        { message: 'Not Authenticaded' },
        { status: 400 }
      );

    const userId = session.user.id;

    // Check if the user has already liked the whisper
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
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
        user: { connect: { id: userId } },
        whisper: { connect: { id: whisperId } },
      },
    });

    return NextResponse.json({ message: 'You have liked this whisper' });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest, { params }: any) => {
  try {
    const session = await getServerSession(authOpstions);
    const whisperId = params.id;

    if (!session)
      return NextResponse.json(
        { message: 'Not Authenticaded' },
        { status: 400 }
      );

    const userId = session.user.id;

    // Check if the user has already liked the whisper
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        whisperId,
      },
    });

    // validate the real author to delete it
    if (!existingLike) {
      return NextResponse.json({
        message: 'You have not liked this whisper.',
      });
    }

    const deleteLike = await prisma.like.delete({
      where: { id: existingLike.id },
    });

    return NextResponse.json({ message: 'You have unliked this whisper' });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
};

// URL: /api/auth/whisper/id

import prisma from '@/app/libs/prismaConn';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOpstions } from '../../[...nextauth]/route';

// update whisper

export const PUT = async (request: NextRequest, { params }: any) => {
  try {
    const body = await request.json();
    const { content } = body;

    const session = await getServerSession(authOpstions);

    const whisperId = params.id;

    if (!session)
      return NextResponse.json(
        { message: 'Not Authenticaded' },
        { status: 400 }
      );

    const authorId = session.user.id;

    // find the whisper with ID
    const findWhisper = await prisma.whisper.findUnique({
      where: { id: whisperId },
    });

    // validate the real author to update it
    if (findWhisper.authorId != authorId) {
      return NextResponse.json({
        message: 'You are not the owner of this ID',
      });
    }

    const updatedWhisper = await prisma.whisper.update({
      where: { id: whisperId },
      data: { content },
    });

    return NextResponse.json({ message: updatedWhisper });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

// Delete Users whisper
export const DELETE = async (request: NextRequest, { params }: any) => {
  try {
    const session = await getServerSession(authOpstions);
    const whisperId = params.id;

    if (!session)
      return NextResponse.json(
        { message: 'Not Authenticaded' },
        { status: 400 }
      );

    const authorId = session.user.id;

    // find the whisper with ID
    const findWhisper = await prisma.whisper.findUnique({
      where: { id: whisperId },
    });

    // validate the real author to update it
    if (findWhisper.authorId != authorId) {
      return NextResponse.json({
        message: 'You are not the owner of this ID',
      });
    }

    const deleteWhisper = await prisma.whisper.delete({
      where: { id: whisperId },
    });

    return NextResponse.json(
      { message: 'successfully deleted whisper', whisper: deleteWhisper },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

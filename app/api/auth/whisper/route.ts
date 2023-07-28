import prisma from '@/app/libs/prismaConn';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOpstions } from '../[...nextauth]/route';

// Create whisper
export const POST = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOpstions);
    const body = await request.json();
    const { content } = body;

    if (!content)
      return NextResponse.json(
        { message: 'Please fill in the feild' },
        { status: 400 }
      );
    if (!session)
      return NextResponse.json(
        { message: 'You need to bee signin to whisper' },
        { status: 400 }
      );

    const authorId = session?.user.id;

    const whisper = await prisma.whisper.create({
      data: {
        authorId,
        content,
      },
      select: {
        id: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    return NextResponse.json({ message: whisper });
  } catch (error) {
    return NextResponse.json(
      { message: "Your whisper wasen't quiet enough", error },
      { status: 500 }
    );
  }
};

import prisma from '@/app/libs/prismaConn';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOpstions } from '../[...nextauth]/route';

// Create whisper
export const POST = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOpstions);
    const body = await request.json();
    const { content, whisperId } = body.data;

    if (!content)
      return NextResponse.json(
        { message: 'Please fill in the feild' },
        { status: 400 }
      );

    if (!session)
      return NextResponse.json(
        { message: 'You need to be signed in to comment' },
        { status: 403 }
      );

    const findUser = await prisma.user.findUnique({
      where: { id: session?.user.id },
    });

    if (!findUser)
      return NextResponse.json(
        { message: 'There is no user with that id' },
        { status: 400 }
      );

    const result = await prisma.comment.create({
      data: {
        title: content,
        userId: findUser.id,
        whisperId: whisperId,
      },
    });

    return NextResponse.json({ message: 'Comment has been created!' });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Your whisper wasen't quiet enough", error },
      { status: 500 }
    );
  }
};

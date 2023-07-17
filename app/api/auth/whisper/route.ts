import prisma from '@/app/libs/prismaConn';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOpstions } from '../[...nextauth]/route';
const jwt = require('jsonwebtoken');

// Create whisper
export const POST = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOpstions);
    const body = await request.json();
    const { content } = body;

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
    console.log(error);
    return NextResponse.json(
      { message: "Your whisper wasen't quiet enough", error },
      { status: 500 }
    );
  }
};

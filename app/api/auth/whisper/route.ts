import prisma from '@/app/libs/prismaConn';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
const jwt = require('jsonwebtoken');

// Create whisper
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { content } = body;
    const token = request.cookies.get('Bearer');

    if (!token || !token.value)
      return NextResponse.json(
        { message: 'Not Authenticaded' },
        { status: 400 }
      );

    const userData = jwt.verify(token.value, process.env.JWT_SECRET); // Decode the JWT to verify the user
    const authorId = userData.id;

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

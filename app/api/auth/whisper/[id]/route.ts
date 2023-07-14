// URL: /api/auth/whisper/id

import prisma from '@/app/libs/prismaConn';
import { NextRequest, NextResponse } from 'next/server';
const jwt = require('jsonwebtoken');

// update whisper

export const PUT = async (request: NextRequest, { params }: any) => {
  const body = await request.json();
  const { content } = body;
  const token = request.cookies.get('Bearer');

  const whisperId = params.id;

  if (!token || !token.value)
    return NextResponse.json({ message: 'Not Authenticaded' }, { status: 400 });

  const userData = jwt.verify(token.value, process.env.JWT_SECRET); // Decode the JWT to verify the user
  const authorId = userData.id;

  // find the whisper with ID
  const findWhisper = await prisma.whisper.findUnique({
    where: { id: whisperId },
  });

  // validate the real author to update it
  if (findWhisper.authorId != authorId) {
    return NextResponse.json({ message: 'You are not the owner of this ID' });
  }

  const updatedWhisper = await prisma.whisper.update({
    where: { id: whisperId },
    data: { content },
  });

  return NextResponse.json({ message: updatedWhisper });
};

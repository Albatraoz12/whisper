// URL: /api/user/

import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOpstions } from '../[...nextauth]/route';
import prisma from '@/app/libs/prismaConn';

// Update User
export const PUT = async (request: NextRequest, response: NextResponse) => {
  try {
    const body = await request.json();
    const { username, email, firstName, lastName } = body;
    const session = await getServerSession(authOpstions);

    if (!session)
      return NextResponse.json({ message: 'You need to be authorized' });

    const userId = session?.user.id;

    const findUser = await prisma.user.findUnique({ where: { id: userId } });

    if (!findUser) return NextResponse.json({ message: 'No user found' });

    const newUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        email,
        firstName,
        lastName,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.log(error);
    return (
      NextResponse.json({ message: 'POST Error: ', error }), { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getServerSession(authOpstions);

    if (!session)
      return NextResponse.json(
        { message: 'You need to be signed in to access the Dashboard' },
        { status: 404 }
      );

    // Search for user
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user)
      return NextResponse.json(
        { message: 'No user with that id' },
        { status: 404 }
      );

    // Fetch user's whispers using the 'authorId' field
    const userWhispers = await prisma.whisper.findMany({
      where: { authorId: session.user.id },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            username: true,
            name: true,
            image: true,
          },
        },
        comments: true,
      },
    });

    return NextResponse.json(userWhispers);
  } catch (error) {
    console.log(error);
    return (
      NextResponse.json({ message: 'GET Error: ', error }), { status: 500 }
    );
  }
};

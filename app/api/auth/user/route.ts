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
      where: { id: 'userData.id' },
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

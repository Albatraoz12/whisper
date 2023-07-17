// URL: /api/user/

import prisma from '@/app/libs/prismaConn';
import { NextRequest, NextResponse } from 'next/server';

// Update User
export const PUT = async (request: NextRequest, response: NextResponse) => {
  try {
    const body = await request.json();
    const { username, email, firstName, lastName } = body;

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

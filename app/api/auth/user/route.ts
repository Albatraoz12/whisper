// URL: /api/user/

import prisma from '@/app/libs/prismaConn';
import { NextRequest, NextResponse } from 'next/server';

// Get user details
export const GET = async (response: NextResponse) => {
  try {
    // Find user and return data
    const user = await prisma.user.findUnique({
      where: {
        id: 'userData.id',
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
      },
    });

    return NextResponse.json({ User: user });
  } catch (error) {
    console.error('Error retrieving user:', error);
    throw error;
  }
};

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

// URL: /api/user

import prisma from '@/app/libs/prismaConn';
import { NextResponse } from 'next/server';

// Create User
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { username, email, password, firstName, lastName } = body;
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
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

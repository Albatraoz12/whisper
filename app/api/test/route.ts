import prisma from '@/app/libs/prismaConn';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { username, email, password } = body;
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
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

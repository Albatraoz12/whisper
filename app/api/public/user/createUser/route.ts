// URL: /api/public/user/createUser

import { generateUsername } from '@/app/libs/helpers';
import prisma from '@/app/libs/prismaConn';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

// Create User
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = body;

    // Check if email is avalible
    const isUser = await prisma.user.findUnique({ where: { email: email } });

    if (isUser)
      return NextResponse.json(
        {
          message: 'Email is already taken, please try again',
        },
        { status: 400 }
      );

    const hashedPassword = bcrypt.hashSync(password, 10);
    const username = generateUsername(firstName, lastName);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    return NextResponse.json({ message: 'User created! 🥳' }, { status: 200 });
  } catch (error) {
    return (
      NextResponse.json({ message: 'POST Error: ', error }), { status: 500 }
    );
  }
};

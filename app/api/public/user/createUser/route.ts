// URL: /api/public/user/createUser

import { generateUsername } from '@/app/libs/helpers';
import prisma from '@/app/libs/prismaConn';
import { NextResponse } from 'next/server';
const bcrypt = require('bcrypt');

// Create User
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = body;
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

    return NextResponse.json(newUser);
  } catch (error) {
    console.log(error);
    return (
      NextResponse.json({ message: 'POST Error: ', error }), { status: 500 }
    );
  }
};

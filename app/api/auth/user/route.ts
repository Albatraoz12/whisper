// URL: /api/user/login

import prisma from '@/app/libs/prismaConn';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const MAX_AGE = 60 * 60 * 24 * 30;

// Authenticate user
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: 'userid',
        role: 'userrole',
      },
      process.env.JWT_SECRET,
      {
        expiresIn: MAX_AGE,
      }
    );

    const response = NextResponse.json({
      message: 'Authenticated',
      status: 200,
    });

    response.cookies.set({
      name: 'Bearer',
      value: token,
      httpOnly: true,
      maxAge: 60 * 60,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Login Error', error },
      { status: 500 }
    );
  }
};

// Logout User
export const DELETE = (response: NextResponse) => {
  try {
    const cookie = response.cookies.get('Bearer');
    if (!cookie)
      return NextResponse.json(
        { message: 'Not Authenticaded' },
        { status: 400 }
      );
    cookies().delete('Bearer');
    return NextResponse.json(
      { message: 'Successfully logged out' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

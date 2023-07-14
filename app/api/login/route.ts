// URL: /api/user

import prisma from '@/app/libs/prismaConn';
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const MAX_AGE = 60 * 60 * 24 * 30;

// Create User
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
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: MAX_AGE,
      }
    );

    const serialized = serialize('OutSiteJWT', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: MAX_AGE,
      path: '/',
    });
    return NextResponse.json({
      message: 'Authenticated',
      status: 200,
      headers: { 'Set-Cookie': serialized },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Login Error', error },
      { status: 500 }
    );
  }
};

// URL: /api/auth/admin

import { generateUsername } from '@/app/libs/helpers';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOpstions } from '../[...nextauth]/route';
import prisma from '@/app/libs/prismaConn';
import bcrypt from 'bcrypt';

// Create User
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, role } = body;
    
    //check is user is admin
    const session = await getServerSession(authOpstions);

    const isAdmin = await prisma.user.findUnique({ where: { email: session?.user.email } });
    
    if(isAdmin.role !== 'admin') return NextResponse.json({message: 'Only admins are allowed in this route'}, {status: 400})

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
        role: role,
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

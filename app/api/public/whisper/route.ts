// URL: /api/public/whisper
import prisma from '@/app/libs/prismaConn';
import { NextResponse } from 'next/server';

// Get all user whispers
export const GET = async (response: NextResponse) => {
  try {
    const allWhispers = await prisma.whisper.findMany();

    return NextResponse.json({ whispers: allWhispers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
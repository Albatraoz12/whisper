import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import QueryWrapper from './QueryWrapper';
import Navbar from './components/Navbar';
import { NextAuthProvider } from './Providers';
import { authOpstions } from './api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

const inter = Inter({ subsets: ['latin'] });

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Whisper',
  description: 'A new social media app where you all can whisper to each other',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOpstions);
  return (
    <html lang='en'>
      <body
        className={`${inter.className} max-w-[1000px] min-h-[100vh] mx-auto border-0 xl:border-x-2 xl:border-x-slate-400`}
      >
        <QueryWrapper>
          <Navbar />
          <NextAuthProvider session={session}>
            <main className='w-[90%] container mx-auto'>{children}</main>
          </NextAuthProvider>
        </QueryWrapper>
      </body>
    </html>
  );
}

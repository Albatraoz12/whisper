import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import QueryWrapper from './QueryWrapper';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Whisper',
  description: 'A new social media app where you all can whisper to each other',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} max-w-[1000px] min-h-[100vh] mx-auto border-x-slate-200 border-x-2`}
      >
        <QueryWrapper>
          <Navbar />
          <main className='w-[90%] container mx-auto'>{children}</main>
        </QueryWrapper>
      </body>
    </html>
  );
}

import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOpstions } from '../api/auth/[...nextauth]/route';
import Login from './auth/Login';
import Logged from './auth/Logged';

export default async function Navbar() {
  const session = await getServerSession(authOpstions);
  console.log(session);

  return (
    <nav className='flex justify-between item-center py-8 w-[90%] mx-auto'>
      <Link href={'/'} className='items-center flex'>
        <h1 className='font-bold text-lg'>Whispers</h1>
      </Link>
      <ul className='flex items-center gap-6'>
        {!session?.user && <Login />}
        {session?.user && <Logged user={session.user} />}
      </ul>
    </nav>
  );
}

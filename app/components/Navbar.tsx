import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOpstions } from '../api/auth/[...nextauth]/route';
import Login from './auth/Login';
import Logged from './auth/Logged';

export default async function Navbar() {
  const session = await getServerSession(authOpstions);

  return (
    <nav className='flex justify-between item-center py-8'>
      <Link href={'/'}>
        <h1 className='font-bold text-lg'>Send it</h1>
      </Link>
      <ul className='flex items-center gap-6'>
        {!session?.user && <Login />}
        {session?.user && <Logged image={session.user.image || ''} />}
      </ul>
    </nav>
  );
}

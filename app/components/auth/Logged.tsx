'use client';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Logged({ user }: any) {
  return (
    <li className='flex gap-2 items-center'>
      {user && user.image ? (
        <a href='/dashboard'>
          <Image
            className='w-auto rounded-full'
            width={42}
            height={42}
            src={user.image}
            alt='user progile pic'
            priority
          />
        </a>
      ) : (
        <a href='/dashboard'>
          <Image
            className='w-10 rounded-full'
            width={42}
            height={42}
            src={`https://avatars.dicebear.com/api/identicon/${user.username}.svg`}
            alt='user progile pic'
            priority
          />
        </a>
      )}
      <p className=' hidden xs:block md:block'>
        {user && user.name ? <>{user.name}</> : <>{user.firstName}</>}
      </p>
      <button
        className='bg-gray-700 text-white text-sm px-6 py-2 rounded-md'
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </li>
  );
}

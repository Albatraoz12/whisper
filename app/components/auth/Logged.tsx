'use client';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Logged({ user }: any) {
  return (
    <li className='flex gap-8 items-center'>
      {user && user.image ? (
        <a href='/dashboard'>
          <Image
            className='w-14 rounded-full'
            width={64}
            height={64}
            src={user.image}
            alt='user progile pic'
            priority
          />
        </a>
      ) : (
        <Image
          className='w-14 rounded-full'
          width={64}
          height={64}
          src={`https://avatars.dicebear.com/api/identicon/${user.username}.svg`}
          alt='user progile pic'
          priority
        />
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

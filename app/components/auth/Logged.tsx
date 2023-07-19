'use client';
import { signOut } from 'next-auth/react';

export default function Logged({ user }: any) {
  return (
    <li className='flex gap-8 items-center'>
      <p>{user && user.name ? <>{user.name}</> : <>{user.firstName}</>}</p>
      <button
        className='bg-gray-700 text-white text-sm px-6 py-2 rounded-md'
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </li>
  );
}

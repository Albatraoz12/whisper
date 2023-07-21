'use client';

export default function Login() {
  return (
    <li className='list-none'>
      <a
        href='/login'
        className='text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25'
      >
        Sign In
      </a>
    </li>
  );
}

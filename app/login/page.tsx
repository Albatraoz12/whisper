'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent } from 'react';

export default function Login() {
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    await signIn('credentials', {
      email: form.get('email'),
      password: form.get('password'),
      callbackUrl: '/',
    });
  }
  return (
    <div className='container mx-auto flex flex-col justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='container mx-auto my-5 flex flex-col gap-3 justify-evenly px-4'
      >
        <h2 className='text-center'>Login</h2>
        <div className='flex flex-col gap-1'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            className='text-black p-1 outline-none py-2 rounded'
            required
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            className='text-black p-1 outline-none py-2 rounded'
            required
          />
        </div>
        <button
          className=' my-3 bg-blue-500 hover:bg-blue-700 max-w-[100px] self-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='submit'
        >
          Submit
        </button>
      </form>
      <p>
        Not registered yet? <Link href='/register'>Register here</Link>
      </p>
      <span className='max-w-[80%] w-full border-t-2 border-white my-4'></span>

      <button
        className='flex gap-3'
        onClick={() => signIn('google', { callbackUrl: '/' })}
      >
        <Image
          src={'https://freesvg.org/img/1534129544.png'}
          height={25}
          width={25}
          alt={'google icon'}
        />
        Login with google
      </button>
    </div>
  );
}

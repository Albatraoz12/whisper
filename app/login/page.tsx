'use client';
import { signIn } from 'next-auth/react';
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
        className='container mx-auto my-5 flex flex-col justify-evenly px-4'
      >
        <h2>Login</h2>
        <label htmlFor='email'>Username:</label>
        <input
          type='email'
          id='email'
          name='email'
          className='text-black p-1 outline-none'
          required
        />
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          className='text-black p-1 outline-none'
          required
        />
        <button type='submit'>Submit</button>
      </form>
      <p>
        Not registered yet? <Link href='/register'>Register here</Link>
      </p>

      <button onClick={() => signIn('google')}> Login with google</button>
    </div>
  );
}

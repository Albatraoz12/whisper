'use client';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

const schema = z.object({
  firstName: z.string().nonempty('Please enter your First Name'),
  lastName: z.string().nonempty('Please enter your Last Name'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confPassword: z.string(),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const { firstName, lastName, email, password, confPassword } = data;
    const formData = {
      firstName,
      lastName,
      email,
      password,
    };

    // Check if passwords match
    if (password !== confPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        '/api/public/user/createUser',
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error while creating user:', error);
    }
  };

  return (
    <section>
      <form
        className='w-full max-w-lg mx-auto'
        onSubmit={handleSubmit(onSubmit)}
        name='registerForm'
      >
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-first-name'
            >
              First Name
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                errors.firstName ? 'border-red-500' : 'border-gray-200'
              }`}
              {...register('firstName')}
              type='text'
              placeholder='Jane'
            />
            {errors.firstName && (
              <p className='text-red-500 text-xs italic'>
                {errors.firstName.message as string}
              </p>
            )}
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-last-name'
            >
              Last Name
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                errors.lastName ? 'border-red-500' : 'border-gray-200'
              }`}
              {...register('lastName')}
              id='grid-last-name'
              type='text'
              placeholder='Doe'
            />
            {errors.lastName && (
              <p className='text-red-500 text-xs italic'>
                {errors.lastName.message as string}
              </p>
            )}
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              }`}
              id='email'
              {...register('email')}
              type='email'
              name='email'
              placeholder='john.doe@gmail.com'
            />
            {errors.email && (
              <p className='text-red-500 text-xs italic'>
                {errors.email.message as string}
              </p>
            )}
            <p className='text-gray-600 text-xs italic'>
              Make it as long and as crazy as you&apos;d like
            </p>
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                errors.password ? 'border-red-500' : 'border-gray-200'
              }`}
              {...register('password')}
              id='password'
              type='password'
              name='password'
              placeholder='******************'
            />
            {errors.password && (
              <p className='text-red-500 text-xs italic'>
                {errors.password.message as string}
              </p>
            )}
            <p className='text-gray-600 text-xs italic'>
              Make it as long and as crazy as you&apos;d like
            </p>
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='confPassword'
            >
              Confirm Password
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                errors.confPassword ? 'border-red-500' : 'border-gray-200'
              }`}
              {...register('confPassword')}
              id='confPassword'
              type='password'
              name='confPassword' // Add the 'name' attribute
              placeholder='******************'
            />
            {errors.confPassword && (
              <p className='text-red-500 text-xs italic'>
                {errors.confPassword.message as string}
              </p>
            )}
            <p className='text-gray-600 text-xs italic'>
              Make it as long and as crazy as you&apos;d like
            </p>
          </div>
        </div>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='submit'
        >
          Register
        </button>
      </form>
    </section>
  );
};

export default Register;

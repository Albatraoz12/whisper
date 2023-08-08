'use client';
import React, { useState } from 'react';
import RegisterUser from './RegisterUser';
import MyWhispers from '@/app/dashboard/MyWhispers';

const Admin = () => {
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);
  return (
    <>
      <div className='flex justify-center items-center gap-10 mt-5 mb-10'>
        <button
          className={
            user
              ? 'bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:bg-blue-500'
              : 'bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          }
          onClick={() => {
            setAdmin(false);
            setUser(true);
          }}
        >
          User Panel
        </button>
        <button
          className={
            admin
              ? 'bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:bg-blue-500'
              : 'bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          }
          onClick={() => {
            setUser(false);
            setAdmin(true);
          }}
        >
          Admin Panel
        </button>
      </div>
      {admin ? <RegisterUser /> : <MyWhispers />}
    </>
  );
};

export default Admin;

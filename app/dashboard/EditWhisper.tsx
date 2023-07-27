'use client';
import Image from 'next/image';
import React from 'react';
import { useQueryClient } from 'react-query';

const EditWhisper = ({ avatar, name, content, comments, id }: any) => {
  let deleteToastID: string;
  const queryClient = useQueryClient();

  return (
    <>
      <section className='bg-white my-8 p-8 rounded-lg'>
        <div className='flex items-center gap-2'>
          <Image width={32} height={32} src={avatar} alt='avatar' />
          <h3 className='font-bold text-green-700'>{name}</h3>
        </div>
        <div className='my-8'>
          <p className='break-all'>{content}</p>
        </div>
        <div className='flex items-center gap-4'>
          <p className='text-sm font-bold text-gray-700'>{comments?.length}</p>
        </div>
      </section>
    </>
  );
};

export default EditWhisper;

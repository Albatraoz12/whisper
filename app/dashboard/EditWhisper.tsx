'use client';
import Image from 'next/image';
import React from 'react';
import { useQueryClient } from 'react-query';
import { formatCreatedAt } from '../libs/helpers';

const EditWhisper = ({
  avatar,
  name,
  content,
  comments,
  id,
  createdAt,
}: any) => {
  let deleteToastID: string;
  const queryClient = useQueryClient();

  return (
    <>
      <section className='border-2 rounded p-6 border-white'>
        <a href={`/whisper/${id}`}>
          <div className='flex items-center gap-2'>
            <Image width={32} height={32} src={avatar} alt='avatar' />
            <h3 className='font-bold'>{name}</h3>
          </div>
          <div className='my-8'>
            <p className='break-all'>{content}</p>
          </div>
          <div className='flex justify-between'>
            <span>{comments.length} 💬</span>
            <span>{formatCreatedAt(createdAt)}</span>
          </div>
        </a>
      </section>
    </>
  );
};

export default EditWhisper;

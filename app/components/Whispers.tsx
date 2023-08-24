'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Heart from './Heart';
import { useSession } from 'next-auth/react';

const Whispers = ({ Whisps }: any) => {
  const userDetails = useSession();
  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString('sv-SE');
  };

  console.log(Whisps);
  return (
    <div className='flex flex-col gap-3 mt-12'>
      {Array.isArray(Whisps) && Whisps.length >= 2 ? (
        Whisps.map((whisper: any, index: number) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            key={index}
            className='border-2 rounded p-6 border-white'
          >
            <a href={`/whisper/${whisper.id}`} className='flex flex-col gap-4'>
              <div className='flex gap-3'>
                <Image
                  src={
                    whisper.author.image
                      ? whisper.author.image
                      : `https://avatars.dicebear.com/api/identicon/${whisper.author.username}.svg`
                  }
                  alt='users image'
                  width={32}
                  height={32}
                  className='rounded-full'
                />
                <h2>{whisper.author.username || whisper.author?.name}</h2>
              </div>
              <p>{whisper.content}</p>
              <div className='flex justify-between'>
                <div className='flex gap-3'>
                  <span>{whisper.comments.length} 💬</span>
                  <span>{whisper.likes.length} &#10084;</span>
                </div>
                <span>{formatCreatedAt(whisper.createdAt)}</span>
              </div>
            </a>
          </motion.div>
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='border-2 rounded p-6 border-white'
        >
          <div className='flex items-center gap-3 mb-6'>
            <Image
              src={
                Whisps.author && Whisps.author.image
                  ? Whisps.author.image
                  : `https://avatars.dicebear.com/api/identicon/${Whisps.author.username}.svg`
              }
              alt='users image'
              width={32}
              height={32}
              className='rounded-full'
            />
            <h2>{Whisps.author.username || Whisps.author?.name}</h2>
          </div>
          <p>{Whisps?.content}</p>
          <div className='flex justify-between my-3'>
            <Heart
              id={Whisps.id}
              likes={Whisps.likes}
              userId={userDetails.data?.user?.id}
            />
            <p>{formatCreatedAt(Whisps?.createdAt || '')}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Whispers;

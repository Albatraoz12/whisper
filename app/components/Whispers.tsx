'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Whispers = ({ Whisps }: any) => {
  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString('sv-SE');
  };

  return (
    <div className='flex flex-col gap-3 mt-12'>
      {Array.isArray(Whisps) && Whisps.length > 0 ? (
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
                <span>{whisper.comments.length} 💬</span>
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
          <div className='flex gap-3'>
            <Image
              src={
                Whisps.author.image
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
          <p>{formatCreatedAt(Whisps?.createdAt || '')}</p>
        </motion.div>
      )}
    </div>
  );
};

export default Whispers;

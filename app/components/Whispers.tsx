'use client';
import React from 'react';
import { motion } from 'framer-motion';

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
              <h2>{whisper.author.username || whisper.author?.name}</h2>
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
          <h2>{Whisps?.author?.username || Whisps?.author.name}</h2>
          <p>{Whisps?.content}</p>
          <p>{formatCreatedAt(Whisps?.createdAt || '')}</p>
        </motion.div>
      )}
    </div>
  );
};

export default Whispers;

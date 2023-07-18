'use client';
import React from 'react';

const Whispers = ({ Whisps }: any) => {
  console.log(Whisps);

  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString('sv-SE'); // Adjust the format as per your preference
  };

  return (
    <div className='flex flex-col gap-3 mt-12'>
      {Whisps &&
        Whisps.length > 0 &&
        Whisps.map((whisper: any, index: number) => (
          <div key={index} className='border-2 rounded p-6 border-white'>
            <a href={`/whisper/${whisper.id}`} className='flex flex-col gap-4'>
              <h2>{whisper.author.username}</h2>
              <p>{whisper.content}</p>
              <p className='self-end'>{formatCreatedAt(whisper.createdAt)}</p>
            </a>
          </div>
        ))}
    </div>
  );
};

export default Whispers;

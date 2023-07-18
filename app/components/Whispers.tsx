'use client';
import React from 'react';

const Whispers = ({ Whisps }: any) => {
  console.log(Whisps);
  return (
    <div>
      {Whisps &&
        Whisps.length > 0 &&
        Whisps.map((whisper: any, index: number) => (
          <h1 key={index}>{whisper.id}</h1>
        ))}
    </div>
  );
};

export default Whispers;

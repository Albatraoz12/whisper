'use client';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';

const Heart = ({ id }: any) => {
  console.log('id', id);

  const like = async () => {
    const response = await axios.post(`/api/auth/whisper/like/${id}`);
    const data = await response.data;
    console.log(data);
    return data;
  };

  return (
    <>
      <button type='button' onClick={() => like()}>
        <Image
          src={'/heart.svg'}
          height={30}
          width={30}
          alt='heart shape icon'
        />
      </button>
    </>
  );
};

export default Heart;

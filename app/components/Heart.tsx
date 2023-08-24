'use client';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Heart = ({ id, likes, userId }: any) => {
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const userHasLiked = likes.some((like: any) => like === userId);
    setHasLiked(userHasLiked);
  }, [likes, userId]);
  console.log(hasLiked);
  const like = async () => {
    try {
      const response = await axios.post(`/api/auth/whisper/like/${id}`);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex gap-2 items-center'>
      <button type='button' onClick={() => like()}>
        <Image
          src={hasLiked ? '/likedHeart.svg' : '/heart.svg'}
          height={30}
          width={30}
          alt='heart shape icon'
        />
      </button>
      <span>{likes.length}</span>
    </div>
  );
};

export default Heart;

'use client';

import Image from 'next/image';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

const Heart = ({ id, likes, userId }: any) => {
  const [hasLiked, setHasLiked] = useState(false);
  const queryClient = useQueryClient();
  let commentToastId: string;

  const { mutate } = useMutation(
    async () => {
      return axios.post(`/api/auth/whisper/like/${id}`);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['whisper']);
        toast.success('You have liked this whisper', { id: commentToastId });
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commentToastId });
        }
      },
    }
  );

  useEffect(() => {
    const userHasLiked = likes.some((like: any) => like === userId);
    setHasLiked(userHasLiked);
  }, [likes, userId]);

  const like = () => {
    commentToastId = toast.loading('Adding your comment', {
      id: commentToastId,
    });
    mutate();
  };

  return (
    <div className='flex gap-2 items-center'>
      {hasLiked ? (
        <>
          <button type='button' onClick={() => like()}>
            <Image
              src={'/likedHeart.svg'}
              height={30}
              width={30}
              alt='heart shape icon'
            />
          </button>
          <span>{likes.length}</span>
        </>
      ) : (
        <>
          <button type='button' onClick={() => like()}>
            <Image
              src={'/heart.svg'}
              height={30}
              width={30}
              alt='heart shape icon'
            />
          </button>
          <span>{likes.length}</span>
        </>
      )}
    </div>
  );
};

export default Heart;

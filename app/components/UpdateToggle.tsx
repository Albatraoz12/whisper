'use client';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

type ToggleProps = {
  setToggle: (toggle: boolean) => void;
  id: string;
};

const UpdateToggle = ({ setToggle, id }: ToggleProps) => {
  let deleteToastID: string;
  const queryClient = useQueryClient();

  //Update whisper
  const { mutate } = useMutation(
    async (id: string) => {
      await axios.put(`/api/auth/whisper/${id}`);
    },
    {
      onError: (error) => {
        toast.error('Error while updateing your whisper, try again later!', {
          id: deleteToastID,
        });
      },
      onSuccess: (data) => {
        toast.success('Your whisper has now been updated', {
          id: deleteToastID,
        });
        queryClient.invalidateQueries(['getAuthWhispers']);
      },
    }
  );

  const updateWhisper = () => {
    deleteToastID = toast.loading('updating your post...', {
      id: deleteToastID,
    });
    mutate(id);
  };

  return (
    <section
      onClick={(e) => {
        setToggle(false);
      }}
      className='fixed bg-black/20  w-full h-full z-20 left-0 top-0'
    >
      <div className='absolute bg-slate-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6'>
        <h2 className='text-xl'>Are you sure you want to delete this post ?</h2>
        <h3 className='text-red-300 text-sm'>
          Press this button to delete this post
        </h3>
        <button
          onClick={updateWhisper}
          className='bg-red-600 text-sm text-white py-2 px-4 rounded-md'
        >
          Update Whsiper
        </button>
      </div>
    </section>
  );
};

export default UpdateToggle;

'use client';
import axios, { AxiosError } from 'axios';
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

const CreateWhisper = () => {
  const [whisperContent, setWhisperContent] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostID: string;

  //Create a whisper
  const { mutate } = useMutation(
    async (whisperContent: string) =>
      await axios.post('/api/auth/whisper', {
        content: whisperContent,
      }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID });
          setWhisperContent('');
        }
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(['whispers']);
        toast.success('Post has been made 🔥', { id: toastPostID });
        setWhisperContent('');
        setIsDisabled(false);
      },
    }
  );

  const submitWhisper = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(false);
    toastPostID = toast.loading('Creating your post', { id: toastPostID });
    mutate(whisperContent);
  };

  return (
    <>
      <form className='flex flex-col gap-10 mt-10' onSubmit={submitWhisper}>
        <label htmlFor='whisper' className='hidden'>
          Whisper
        </label>
        <textarea
          name='whisper'
          id='whisper'
          cols={50}
          rows={5}
          className='bg-black text-white border-2 p-4 active:outline-none focus:border-gray-300 focus:outline-none'
          placeholder='Whisper into my ear'
          value={whisperContent}
          onChange={(e) => setWhisperContent(e.target.value)}
        />
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
        >
          Whisper
        </button>
      </form>
    </>
  );
};

export default CreateWhisper;

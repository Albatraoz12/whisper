'use client';
import React, { FormEvent, useState } from 'react';
import { useQueryClient } from 'react-query';

const CreateWhisper = () => {
  const [whisperContent, setWhisperContent] = useState('');
  const queryClient = useQueryClient();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const res = fetch('/api/auth/whisper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: form.get('whisper'),
      }),
    });
    const data = (await res).json();

    if (!data) return null;

    queryClient.invalidateQueries(['whispers']);
    setWhisperContent('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWhisperContent(e.target.value);
  };

  return (
    <>
      <form className='flex flex-col gap-10 mt-10' onSubmit={handleSubmit}>
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
          onChange={handleChange}
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

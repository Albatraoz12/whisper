'use client';
import React from 'react';

const CreateWhisper = () => {
  return (
    <>
      <form className='flex flex-col gap-10'>
        <label htmlFor='whisper' className='hidden'>
          Whisper
        </label>
        <textarea
          name='whisper'
          id='whisper'
          cols={50}
          rows={10}
          className=' bg-black text-white'
          placeholder='Whisper into my ear'
        />
        <button
          type='submit'
          className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
        >
          Whisper
        </button>
      </form>
    </>
  );
};

export default CreateWhisper;

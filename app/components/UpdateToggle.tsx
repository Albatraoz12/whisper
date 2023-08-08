'use client';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

type ToggleProps = {
  setToggle: (toggle: boolean) => void;
  id: string;
  content: string;
};

const UpdateToggle = ({ setToggle, id, content }: ToggleProps) => {
  let deleteToastID: string;
  const queryClient = useQueryClient();
  const [updatedContent, setUpdatedContent] = useState(content);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedContent(e.target.value);
  };

  //Update whisper
  const { mutate } = useMutation(
    async (id: string) => {
      await axios.put(`/api/auth/whisper/${id}`, { content: updatedContent });
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
      className='fixed bg-black/90  w-full h-full z-20 left-0 top-0'
    >
      <div className='absolute bg-slate-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6'>
        <h2 className='text-xl'>Are you sure you want to delete this post ?</h2>
        <textarea
          name='conent'
          id='content'
          cols={30}
          rows={10}
          className='text-black'
          onChange={handleContentChange}
          value={updatedContent}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {content}
        </textarea>
        <button
          onClick={updateWhisper}
          className='bg-yellow-600 text-sm text-white py-2 px-4 rounded-md'
        >
          Update Whsiper
        </button>
      </div>
    </section>
  );
};

export default UpdateToggle;

'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

type PostProps = {
  id?: string;
};

type Comment = {
  whisperId?: string;
  content: string;
};

export default function AddComment({ id }: PostProps) {
  const [content, setContent] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let commentToastId: string;

  const { mutate } = useMutation(
    async (data: Comment) => {
      return axios.post('/api/auth/comment', { data });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['whisper']);
        setContent('');
        setIsDisabled(false);
        toast.success('Added your comment', { id: commentToastId });
      },
      onError: (error) => {
        setIsDisabled(false);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commentToastId });
        }
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    commentToastId = toast.loading('Adding your comment', {
      id: commentToastId,
    });
    mutate({ content, whisperId: id });
  };

  return (
    <section>
      <form onSubmit={submitPost} className='my-8'>
        <h3>Add a comment</h3>
        <div className='flex flex-col my-2'>
          <input
            onChange={(e) => setContent(e.target.value)}
            value={content}
            type='text'
            name='title'
            className='p-4 text-lg rounded-md my-2 text-black'
          />
        </div>
        <div className='flex items-center gap-2'>
          <button
            disabled={isDisabled}
            className=' text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25'
            type='submit'
          >
            Add Comment 🚀
          </button>
          <p
            className={`font-bold  ${
              content.length > 300 ? 'text-red-700' : 'text-gray-700'
            } `}
          >{`${content.length}/300`}</p>
        </div>
      </form>
    </section>
  );
}

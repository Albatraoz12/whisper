'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { formatCreatedAt } from '../libs/helpers';
import toast from 'react-hot-toast';
import axios from 'axios';
import Toggle from '../components/Toggle';
import UpdateToggle from '../components/UpdateToggle';

const EditWhisper = ({
  avatar,
  name,
  content,
  comments,
  id,
  createdAt,
}: any) => {
  const [toggle, setToggle] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(false);
  let deleteToastID: string;
  const queryClient = useQueryClient();

  //Delete posts
  const { mutate } = useMutation(
    async (id: string) => {
      await axios.delete(`/api/auth/whisper/${id}`);
    },
    {
      onError: (error) => {
        toast.error('Error while deleteing the post, try again later!', {
          id: deleteToastID,
        });
      },
      onSuccess: (data) => {
        toast.success('Your post has now been deleted', { id: deleteToastID });
        queryClient.invalidateQueries(['getAuthWhispers']);
      },
    }
  );

  const deletePost = () => {
    deleteToastID = toast.loading('Deleting your post...', {
      id: deleteToastID,
    });
    mutate(id);
  };

  return (
    <>
      <section className='border-2 rounded p-6 border-white'>
        <a href={`/whisper/${id}`}>
          <div className='flex items-center gap-2'>
            <Image
              width={32}
              height={32}
              src={avatar}
              alt='avatar'
              className='rounded-full'
            />
            <h3 className='font-bold'>{name}</h3>
          </div>
          <div className='my-8'>
            <p className='break-all'>{content}</p>
          </div>
          <div className='flex justify-between'>
            <span>{comments.length} 💬</span>
            <span>{formatCreatedAt(createdAt)}</span>
          </div>
        </a>
        <div className='flex gap-3 mt-10'>
          <button
            onClick={() => setToggle(true)}
            className='text-sm font-bold text-red-500'
          >
            Delete Post
          </button>
          <button
            onClick={() => setUpdateToggle(true)}
            className='text-sm font-bold text-yellow-500'
          >
            Update Post
          </button>
        </div>
      </section>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
      {updateToggle && (
        <UpdateToggle setToggle={setUpdateToggle} id={id} content={content} />
      )}
    </>
  );
};

export default EditWhisper;

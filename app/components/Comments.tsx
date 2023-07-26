'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { formatCreatedAt } from '../libs/helpers';

const Comments = ({ comment }: any) => {
  if (comment.length >= 0 || !comment) return <div>No Comments....</div>;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className='border-2 rounded p-6 border-white'
    >
      <div className='flex flex-col gap-4'>
        <h2>{comment.author.username || comment.author?.name}</h2>
        <p>{comment.title}</p>
        <div className='flex justify-between'>
          <span>{formatCreatedAt(comment.createdAt)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Comments;

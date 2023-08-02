'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { formatCreatedAt } from '../libs/helpers';

const Comments = ({ comment }: any) => {
  if (comment.length <= 0 || !comment) return <div>No Comments....</div>;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {comment.map((item: any, index: number) => (
        <div className='flex flex-col gap-4 p-4 my-3 border-2' key={index}>
          <h2>{item.user.username || item.user?.name}</h2>
          <p>{item.title}</p>
          <div className='flex justify-between'>
            <span>{formatCreatedAt(item.createdAt)}</span>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default Comments;

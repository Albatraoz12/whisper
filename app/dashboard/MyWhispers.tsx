'use client';
import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { WhispersTyps } from '../types/Whispers';
import EditWhisper from './EditWhisper';

const fetchAuthWhispers = async () => {
  const response = await axios.get('/api/auth/user');
  return response.data;
};

const MyWhispers = () => {
  const { data, isLoading } = useQuery<any>({
    queryFn: fetchAuthWhispers,
    queryKey: ['getAuthWhispers'],
  });

  if (isLoading) return <h1>Loading Posts.....</h1>;

  return (
    <div className='flex flex-col gap-3 mt-12'>
      {data &&
        data.map((whisper: any) => (
          <EditWhisper
            id={whisper.id}
            key={whisper.id}
            avatar={
              whisper.author.username
                ? `https://avatars.dicebear.com/api/identicon/${whisper.author.username}.svg`
                : whisper.author.image
            }
            name={
              whisper.author.name
                ? whisper.author.name
                : whisper.author.username
            }
            content={whisper.content}
            comments={whisper.comments}
            createdAt={whisper.createdAt}
          />
        ))}
    </div>
  );
};

export default MyWhispers;

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
  console.log('data', data);
  return (
    <div>
      {data &&
        data.map((whisper: any) => (
          <EditWhisper
            id={whisper.id}
            key={whisper.id}
            avatar={
              whisper.author.username
                ? `https://avatars.dicebear.com/api/identicon/${whisper.author.name}.svg`
                : whisper.author.image
            }
            name={
              whisper.author.name
                ? whisper.author.name
                : whisper.author.username
            }
            title={whisper.content}
            comments={whisper.comments}
          />
        ))}
    </div>
  );
};

export default MyWhispers;

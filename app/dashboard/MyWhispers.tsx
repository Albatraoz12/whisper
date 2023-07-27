'use client';
import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { WhispersTyps } from '../types/Whispers';

const fetchAuthWhispers = async () => {
  const response = await axios.get('/api/auth/user');
  return response.data;
};

const MyWhispers = () => {
  const { data, isLoading } = useQuery<WhispersTyps>({
    queryFn: fetchAuthWhispers,
    queryKey: ['getAuthWhispers'],
  });

  if (isLoading) return <h1>Loading Posts.....</h1>;
  console.log('data', data);
  return (
    <div>
      <h2>Hello Dashboard</h2>
    </div>
  );
};

export default MyWhispers;

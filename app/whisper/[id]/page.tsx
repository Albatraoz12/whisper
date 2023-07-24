'use client';
import Whispers from '@/app/components/Whispers';
import { WhispersTyps } from '@/app/types/Whispers';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const Page = ({ params }: any) => {
  const fetchWhisper = async () => {
    const res = await axios.get(`/api/public/whisper/${params.id}`);
    const data = await res.data;
    return data;
  };

  const { data, error, isLoading } = useQuery<WhispersTyps[]>({
    queryFn: fetchWhisper,
    queryKey: ['whisper'],
  });
  if (error) return error;
  if (isLoading) return 'Loading...';

  return <section>{data && <Whispers Whisps={data} />}</section>;
};

export default Page;

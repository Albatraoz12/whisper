'use client';
import AddComment from '@/app/components/AddComment';
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

  const { data, error, isLoading } = useQuery<WhispersTyps>({
    queryFn: fetchWhisper,
    queryKey: ['whisper'],
  });

  if (error) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;

  if (!data) {
    return <div>No data found.</div>;
  }

  return (
    <>
      <section>
        <Whispers Whisps={[data]} />
      </section>
      <section>
        <AddComment id={data.id} />
      </section>
    </>
  );
};

export default Page;

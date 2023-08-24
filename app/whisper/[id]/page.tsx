'use client';
import AddComment from '@/app/components/AddComment';
import Comments from '@/app/components/Comments';
import Spinner from '@/app/components/Spinner';
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
  if (isLoading) return <Spinner small={false} />;

  if (!data) {
    return <div>No data found.</div>;
  }

  return (
    <>
      <section>
        <Whispers Whisps={data} />
      </section>
      <section>
        <AddComment id={data.id} />
      </section>
      <section>{data && <Comments comment={data.comments} />}</section>
    </>
  );
};

export default Page;

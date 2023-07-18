import Whispers from '@/app/components/Whispers';
import React from 'react';

const page = async ({ params }: any) => {
  console.log(params.id);
  const fetchWhisper = async () => {
    const res = await fetch(
      `http://localhost:3001/api/public/whisper/${params.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();
    console.log('data', data);
  };
  const whisper = await fetchWhisper();
  return (
    <section>
      {params.id}
      <Whispers whisper={whisper} />
    </section>
  );
};

export default page;

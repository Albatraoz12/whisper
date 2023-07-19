'use client';
import CreateWhisper from './components/CreateWhisper';
import Whispers from './components/Whispers';
import { useQuery } from 'react-query';
import { WhispersTyps } from './types/Whispers';
import axios from 'axios';

export default function Home() {
  const getWhispers = async () => {
    const response = await axios.get('/api/public/whisper');
    return response.data.whispers;
  };

  const { data, error, isLoading } = useQuery<WhispersTyps[]>({
    queryFn: getWhispers,
    queryKey: ['whispers'],
  });
  if (error) return error;
  if (isLoading) return 'Loading...';

  return (
    <>
      <section className='container mx-auto my-4 text-center'>
        <div className='container border-stone-100'>
          <p>What is on your mind ?</p>
          <CreateWhisper />
        </div>
      </section>
      <section className='container mx-auto'>
        <Whispers Whisps={data} />
      </section>
    </>
  );
}

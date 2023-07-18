import { getServerSession } from 'next-auth';
import { authOpstions } from './api/auth/[...nextauth]/route';
import CreateWhisper from './components/CreateWhisper';
import Whispers from './components/Whispers';

export default async function Home() {
  const session = await getServerSession(authOpstions);

  const getWhispers = async () => {
    const res = await fetch('http://localhost:3001/api/public/whisper', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data.whispers;
  };
  const whispData = await getWhispers();

  return (
    <>
      <section className='container mx-auto my-4 w-[90%] text-center'>
        <h1>
          {session
            ? 'Welcome ' +
              session?.user.firstName +
              ' ' +
              session?.user.lastName
            : 'Welcome User'}
        </h1>
        <div className='container border-stone-100'>
          <p>What is on your mind ?</p>
          <CreateWhisper />
        </div>
      </section>
      <section>
        <Whispers Whisps={whispData} />
      </section>
    </>
  );
}

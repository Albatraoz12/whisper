import { getServerSession } from 'next-auth';
import { authOpstions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOpstions);
  console.log(session);
  return (
    <section className='container mx-auto my-4 w-[90%] text-center'>
      <h1>
        {session
          ? 'Welcome ' + session?.user.firstName + ' ' + session?.user.lastName
          : 'Welcome User'}
      </h1>
      <div className='container border-stone-100'>
        <p>What is on your mind ?</p>
      </div>
    </section>
  );
}

import React from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOpstions } from '../api/auth/[...nextauth]/route';

const Dashboard = async () => {
  const session = await getServerSession(authOpstions);
  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <section>
      <div>
        <h2>Your Dashboard</h2>
      </div>
      <div>Your Whispers</div>
      <section>post1 post1 post1 post1 post1 post1</section>
    </section>
  );
};

export default Dashboard;

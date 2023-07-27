import React from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOpstions } from '../api/auth/[...nextauth]/route';
import MyWhispers from './MyWhispers';

const Dashboard = async () => {
  const session = await getServerSession(authOpstions);
  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <section>
      <MyWhispers />
    </section>
  );
};

export default Dashboard;

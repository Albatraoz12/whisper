'use client';
import React from 'react';

const Dashboard = () => {
  const fetchUserData = async () => {
    const response = await fetch(`http://localhost:3001/api/auth/user`);
    const data = response.json();
    return data;
  };

  const test = fetchUserData();
  console.log(test);
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

import React from 'react';

const page = ({ params }: any) => {
  console.log(params.id);
  return <section>{params.id}</section>;
};

export default page;

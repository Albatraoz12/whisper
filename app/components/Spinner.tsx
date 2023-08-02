import Image from 'next/image';
import React from 'react';

const Spinner = () => {
  return (
    <div className='flex items-center justify-center h-[50vh]'>
      <Image
        src='/spinner.svg'
        alt='spinner'
        className='animate-spin'
        width={220}
        height={220}
      />
    </div>
  );
};

export default Spinner;

import Image from 'next/image';
import React from 'react';

const Spinner = ({ small }: { small: boolean }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        small ? 'h-[25px] w-[25px]' : 'h-[50vh]'
      }`}
    >
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

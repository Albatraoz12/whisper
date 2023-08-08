'use client';

type ToggleProps = {
  deletePost: () => void;
  setToggle: (toggle: boolean) => void;
};

export default function Toggle({ deletePost, setToggle }: ToggleProps) {
  return (
    <section
      onClick={(e) => {
        setToggle(false);
      }}
      className='fixed bg-black/90 w-full h-full z-20 left-0 top-0'
    >
      <div className='absolute bg-slate-500 w-[90%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6 md:max-w-[700px]'>
        <h2 className='text-xl'>Are you sure you want to delete this post ?</h2>
        <h3 className='text-red-300 text-sm'>
          Press this button to delete this post
        </h3>
        <button
          onClick={deletePost}
          className='bg-red-600 text-sm text-white py-2 px-4 rounded-md'
        >
          Delete Post
        </button>
      </div>
    </section>
  );
}

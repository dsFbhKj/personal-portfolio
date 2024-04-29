import React from 'react';
import hyperspace from '/hyperspace.mp4';

const Hyperspace = () => {
  return (
    <>
      <div className='card w-96 bg-base-100 shadow-xl'>
        <figure>
          <video
            src={hyperspace}
            width='750'
            height='600'
            autoPlay
            muted
            loop
          />
          <span className='countdown font-mono text-6xl'>
            <span style={{ '--value': 21 }}></span>
          </span>
        </figure>
      </div>
      <a
        role='button'
        href='/hyperspace'
        className='btn btn-neutral btn-active'
      >
        Universe
      </a>
    </>
  );
};
export default Hyperspace;

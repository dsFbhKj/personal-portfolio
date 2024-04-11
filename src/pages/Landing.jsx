import React from 'react';
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

const Landing = () => {
  return (
    <>
      <div className='hero min-h-screen bg-gradient-to-br from-pink-600 via-red-700 to-yellow-300'>
        <div className='hero-overlay bg-opacity-60'></div>
        <div className='hero-content text-center text-neutral-content'>
          <div className='max-w-md'>
            <h1 className='mb-7 text-7xl font-bold flex items-stretch whitespace-nowrap justify-center'>
              Georgiana Barefield
            </h1>
            <p className='mb-7'>
              Hi there! Welcome to my portfolio, where creativity meets
              development. To get started on your journey of imagination and
              innovation, simply click the button below. Let's explore together!
            </p>
            <a
              role='button'
              href='/main'
              className='btn btn-neutral btn-active bg-pink-500'
            >
              Begin
            </a>
            <p className='mt-5'>Want to learn more?</p>
            <div className='flex justify-center items-center space-x-4 mb-5 mt-5'>
              <a
                href='https://www.linkedin.com/in/georgibarefield'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaLinkedin size='1.75rem' color='#3a77cc' />
              </a>
              <a
                href='https://github.com/gbaref949'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaGithub size='1.75rem' color='black' />
              </a>
              <a
                href='https://www.youtube.com/@georgiB1'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaYoutube size='1.75rem' color='red' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;

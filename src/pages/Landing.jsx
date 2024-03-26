import React from 'react'
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';
const Landing = () => {
  return (
    <>
    <div className="hero min-h-screen bg-gradient-to-br from-pink-600 via-red-700 to-yellow-300">
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-center text-neutral-content">
      <div className="max-w-md">
        <h1 className="mb-7 text-7xl font-bold">Georgiana Barefield</h1>
        {/* <p className="mb-7">Hi there! Welcome to my portfolio, where creativity meets development. To get started on your journey of imagination and innovation, simply click the button below. Let's explore together!</p> */}
        <p className="mb-5">Want to learn more?</p>
        <div className='quick-links'>
          <a
            href='https://www.linkedin.com/in/georgibarefield'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaLinkedin size='2.5rem' color='#3a77cc' />
          </a>
          <a
            href='https://github.com/gbaref949'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaGithub size='2.5rem' color='black' />
          </a>
          <a
            href='https://www.youtube.com/@georgiB1'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaYoutube size='2.5rem' color='red' />
          </a>
          </div>
        <button className="btn btn-neutral"><a href='/main'>Begin</a></button>
      </div>
    </div>
  </div>
    </>
  )
}

export default Landing
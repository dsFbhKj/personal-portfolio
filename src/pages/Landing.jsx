import React from 'react'

const Landing = () => {
  return (
    <>
    <div className="hero min-h-screen bg-gradient-to-br from-pink-600 via-red-700 to-yellow-300">
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-center text-neutral-content">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold">Georgiana Barefield</h1>
        <p className="mb-5">Hi there! Welcome to my portfolio, where creativity meets development. To get started on your journey of imagination and innovation, simply click the button below. Let's explore together!</p>
        <button className="btn btn-neutral"><a href='/experience'>Begin</a></button>
      </div>
    </div>
  </div>
    </>
  )
}

export default Landing
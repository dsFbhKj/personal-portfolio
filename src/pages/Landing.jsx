import React, { useState } from 'react';
import me from '/me.mp4';
import styles from '../styles/Landing.module.css';
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

import { useTrail, a } from '@react-spring/web';

const Trail = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className={styles.trailsText} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};

const Landing = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      <div className="hero min-h-screen bg-gradient-radial bg-radial-circle from-pink-600 to-yellow-300 via-red-700">
        <div className="hero-overlay bg-opacity-60"/>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <div onClick={toggleOpen}>
              <Trail open={isOpen}>
                <span className="whitespace-nowrap">Georgiana Barefield</span>
              </Trail>
            </div>
            <p className="mb-10 mt-5">
              Welcome to my portfolio! To get started on your journey of
              imagination and innovation, simply click the button below.
            </p>
            <div className="flex justify-start items-start">
              <div className="card w-2/4 bg-base-100 shadow-xl mr-10 ml-4">
                <figure>
                  <video
                    src={me}
                    width="300"
                    height="300"
                    autoPlay
                    muted
                    loop
                  />
                </figure>
              </div>
              <div className="flex flex-col justify-around mt-10">
                <p>
                  <strong>Want to learn more?</strong>
                </p>
                <div className="flex justify-center space-x-4 mb-5 mt-5">
                  <a
                    href="https://www.linkedin.com/in/georgibarefield"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin size="1.75rem" color="#3a77cc" />
                  </a>
                  <a
                    href="https://github.com/gbaref949"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub size="1.75rem" color="black" />
                  </a>
                  <a
                    href="https://www.youtube.com/@georgiB1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube size="1.75rem" color="red" />
                  </a>
                </div>
                <a
                  role="button"
                  href="/hyperspace"
                  className="btn btn-neutral btn-active bg-pink-500"
                >
                  Begin
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;

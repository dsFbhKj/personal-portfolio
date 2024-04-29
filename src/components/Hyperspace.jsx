import React, { useRef, useEffect, useState } from 'react';
import hyperspace from '/hyperspace.mp4';

const Hyperspace = () => {
  const videoRef = useRef(null);
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const showLinkTimeout = setTimeout(() => {
      setShowLink(true);
    }, 5000); // 5000 milliseconds (5 seconds)

    const handleVideoEnded = () => {
      setShowLink(true);
    };

    video.addEventListener('ended', handleVideoEnded);

    return () => {
      clearTimeout(showLinkTimeout);
      video.removeEventListener('ended', handleVideoEnded);
    };
  }, []);

  return (
    <>
      <div className='card 100-vw 100-vh bg-base-100 shadow-xl flex justify-center relative'>
        <figure>
          <video
            ref={videoRef}
            src={hyperspace}
            width='101%'
            height='100%'
            autoPlay
            muted
            loop
          />
        </figure>
        {showLink && (
          <a
            role='button'
            href='/world'
            className='btn glass btn-active absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center '
          >
            Universe
          </a>
        )}
      </div>
    </>
  );
};

export default Hyperspace;

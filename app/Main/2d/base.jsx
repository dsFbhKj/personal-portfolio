'use client';
import { useSpring, animated } from '@react-spring/web'; //imported animation for react-spring
import AOS from 'aos'; //need both the import
import 'aos/dist/aos.css'; //and css for AOS to work
import { useEffect, useRef } from 'react';

export default function Main() {
  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }));

  useEffect(() => {
    AOS.init({});
  }, []);

  const handleClick = () => {
    api.start({
      from: {
        x: 0,
      },
      to: {
        x: 100,
      },
    });
  };


  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 polygons'>
      {/* Add react Soring Animation */}
      <animated.div
        onClick={handleClick}
        style={{
          width: 80,
          height: 80,
          background: '#ff6d6d',
          borderRadius: 8,
          ...springs,
        }}
      />
    </main>
  );
}

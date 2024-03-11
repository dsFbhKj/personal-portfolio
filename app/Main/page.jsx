'use client';
import { useSpring, animated } from '@react-spring/web'; //imported animation for react-spring
import Link from 'next/link';
// import Voronoi from './voronoi';

export default function Home() {
  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }));

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
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div class='scene h-screen w-screen flex justify-center items-center bg-black'>
        <div class='wrap relative w-1000 h-1000 transform -translate-x-1/2 -translate-y-1/2 transform-style-preserv-3d animate-move infinite linear'>
          <div class='wall wall-right absolute w-full h-full opacity-0 animate-fade infinite linear'></div>
          <div class='wall wall-left absolute w-full h-full opacity-0 animate-fade infinite linear'></div>
          <div class='wall wall-top absolute w-full h-full opacity-0 animate-fade infinite linear'></div>
          <div class='wall wall-bottom absolute w-full h-full opacity-0 animate-fade infinite linear'></div>
          <div class='wall wall-back absolute w-full h-full opacity-0 animate-fade infinite linear'></div>
        </div>
        <div class='wrap relative w-1000 h-1000 transform -translate-x-1/2 -translate-y-1/2 transform-style-preserv-3d animate-move infinite linear delay-600s'>
          <div class='wall wall-right absolute w-full h-full opacity-0 animate-fade infinite linear delay-600s'></div>
          <div class='wall wall-left absolute w-full h-full opacity-0 animate-fade infinite linear delay-600s'></div>
          <div class='wall wall-top absolute w-full h-full opacity-0 animate-fade infinite linear delay-600s'></div>
          <div class='wall wall-bottom absolute w-full h-full opacity-0 animate-fade infinite linear delay-600s'></div>
          <div class='wall wall-back absolute w-full h-full opacity-0 animate-fade infinite linear delay-600s'></div>
        </div>
      </div>
    </main>
  );
}

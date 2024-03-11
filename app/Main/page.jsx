'use client';
import { useSpring, animated } from '@react-spring/web'; //imported animation for react-spring
import Link from 'next/link';

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
      <Link href='/'>Click Here</Link>
    </main>
  );
}

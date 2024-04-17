import {
  ContactShadows,
  Environment,
  OrbitControls,
  Sky,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useControls } from 'leva';
import  Avatar  from './Avatar';
import logo from '/logo.png';
import styles from '../styles/Experience.module.css';

const Experience = () => {
  const { animation } = useControls({
    animation: {
      value: 'Sitting',
      options: ['Sitting', 'Hello', 'Standing', 'Falling'],
    },
  });
  return (
    <>
      {/* Avatar */}
      <Canvas
        className={styles.container}
        shadows
        camera={{ position: [0, 2, 5], fov: 30 }}
      >
        <color attach='background' args={['#ececec']} />

        <OrbitControls />
        <Sky />
        <Environment preset='sunset' />
        <group position-y={-1}>
          <ContactShadows
            opacity={0.42}
            scale={10}
            blur={1}
            far={10}
            resolution={256}
            color='#000000'
          />
          <Avatar animation={animation} />
          {animation === 'Sitting' && (
            <mesh scale={[0.8, 0.5, 0.8]} position-y={0.25}>
              <boxGeometry />
              <meshStandardMaterial color='white' />
            </mesh>
          )}
          <mesh scale={5} rotation-x={-Math.PI * 0.5} position-y={-0.001}>
            <planeGeometry />
            <meshStandardMaterial color='white' />
          </mesh>
        </group>
      </Canvas>

      {/* Bottom Nav */}
      <div className='btm-nav btm-nav-md'>
        <li role='button' className='hover:text-blue-500'>
          <a href='/world'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-4 h-4 inline-block mr-1'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
              />
            </svg>
            <span className='btm-nav-label'>World</span>
          </a>
        </li>
        <li
          role='button'
          // className='active'
        >
          <a href='/main'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              />
            </svg>
            <span className='btm-nav-label'>Home</span>
          </a>
        </li>
        <li role='button'>
          <a href='/experience'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
              />
            </svg>
            <span className='btm-nav-label'>Avatar</span>
          </a>
        </li>
      </div>
    </>
  );
};

export default Experience;
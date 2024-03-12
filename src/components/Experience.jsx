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
      value: 'Hello',
      options: ['Hello', 'Standing', 'Falling'],
    },
  });
  return (
    <>
      <div className='navbar bg-neutral text-neutral-content flex justify-between px-4'>
        <img src={logo} alt={'brand logo'} width={50} className='logo mr-4' />
        <button className='btn btn-ghost text-xl'>Georgiana Barefield</button>
        <ul className='menu bg-neutral lg:menu-horizontal rounded-box flex'>
          <li className='ml-auto'>
            <a href='/world' className='hover:text-blue-500'>
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
              <span className='badge badge-sm text-base hover:text-blue-500'>
                MY UNIVERSE
              </span>
            </a>
          </li>
          <li className='ml-4'>
            <a href='/main' className='hover:text-blue-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 inline-block mr-1'
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
              <span className='badge badge-xs badge-info text-base hover:text-blue-500'>
                HOME
              </span>
            </a>
          </li>
          <li className='ml-4'>
            <a href='/' className='hover:text-blue-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 inline-block mr-1'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span className='badge badge-sm badge-warning text-base hover:text-blue-500'>
                MY AVATAR
              </span>
            </a>
          </li>
        </ul>
      </div>
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
          {/* {animation === 'Hello' && (
          <mesh scale={[0.8, 0.5, 0.8,]} position-y={-0.25}>
            <boxGeometry />
            <meshStandardMaterial color='white' />
          </mesh>
        )} */}
          <mesh scale={5} rotation-x={-Math.PI * 0.5} position-y={-0.25}>
            <planeGeometry />
            <meshStandardMaterial color='white' />
          </mesh>
        </group>
      </Canvas>
    </>
  );
};

export default Experience;
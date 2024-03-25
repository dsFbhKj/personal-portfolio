import AOS from 'aos';
import * as THREE from 'three';
import 'aos/dist/aos.css';
import styles from '../styles/World.module.css';
import logo from '/logo.png';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import {
  useCursor,
  MeshPortalMaterial,
  CameraControls,
  Gltf,
  Text,
} from '@react-three/drei';
import { useRoute, useLocation } from 'wouter';
import { easing, geometry } from 'maath';
import { suspend } from 'suspend-react';

extend(geometry);
const regular = import('@pmndrs/assets/fonts/inter_regular.woff');
const medium = import('@pmndrs/assets/fonts/inter_medium.woff');

export default function World() {
  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <>
      <div className='navbar bg-neutral text-neutral-content flex justify-between px-4'>
        {/* NavBar */}
        <img src={logo} alt={'brand logo'} width={50} className='logo mr-4' />
        <button
          className='btn btn-ghost text-xl'
          data-aos='zoom-in-down'
          data-aos-duration='3000'
        >
          Georgiana Barefield
        </button>

        {/* Menu */}
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
      {/* THE UNIVERSE */}
      <Canvas
        camera={{ fov: 75, position: [0, 0, 20] }}
        eventSource={document.getElementById('root')}
        eventPrefix='client'
      >
        <color attach='background' args={['#f0f0f0']} />
        <Frame
          id='01'
          name={`pick\nles`}
          author='Omar Faruq Tawsif'
          bg='#e4cdac'
          position={[-1.15, 0, 0]}
          rotation={[0, 0.5, 0]}
        >
          <Gltf
            src='pickles_3d_version_of_hyuna_lees_illustration-transformed.glb'
            scale={8}
            position={[0, -0.7, -2]}
          />
        </Frame>
        <Frame id='02' name='tea' author='Omar Faruq Tawsif'>
          <Gltf src='fiesta_tea-transformed.glb' position={[0, -2, -3]} />
        </Frame>
        <Frame
          id='03'
          name='still'
          author='Omar Faruq Tawsif'
          bg='#d1d1ca'
          position={[1.15, 0, 0]}
          rotation={[0, -0.5, 0]}
        >
          <Gltf
            src='still_life_based_on_heathers_artwork-transformed.glb'
            scale={2}
            position={[0, -0.8, -4]}
          />
        </Frame>
        <Rig />
      </Canvas>
    </>
  );
};

function Frame({
  id,
  name,
  author,
  bg,
  width = 1,
  height = 1.61803398875,
  children,
  ...props
}) {
  const portal = useRef();
  const [, setLocation] = useLocation();
  const [, params] = useRoute('/item/:id');
  const [hovered, hover] = useState(false);
  useCursor(hovered);
  useFrame((state, dt) =>
    easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt)
  );
  return (
    <group {...props}>
      <Text
        font={suspend(medium).default}
        fontSize={0.3}
        anchorY='top'
        anchorX='left'
        lineHeight={0.8}
        position={[-0.375, 0.715, 0.01]}
        material-toneMapped={false}
      >
        {name}
      </Text>
      <Text
        font={suspend(regular).default}
        fontSize={0.1}
        anchorX='right'
        position={[0.4, -0.659, 0.01]}
        material-toneMapped={false}
      >
        /{id}
      </Text>
      <Text
        font={suspend(regular).default}
        fontSize={0.04}
        anchorX='right'
        position={[0.0, -0.677, 0.01]}
        material-toneMapped={false}
      >
        {author}
      </Text>
      <mesh
        name={id}
        onDoubleClick={(e) => (
          e.stopPropagation(), setLocation('/item/' + e.object.name)
        )}
        onPointerOver={(e) => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial
          ref={portal}
          events={params?.id === id}
          side={THREE.DoubleSide}
        >
          <color attach='background' args={[bg]} />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
}

function Rig({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
}) {
  const { controls, scene } = useThree();
  const [, params] = useRoute('/item/:id');
  useEffect(() => {
    const active = scene.getObjectByName(params?.id);
    if (active) {
      active.parent.localToWorld(position.set(0, 0.5, 0.25));
      active.parent.localToWorld(focus.set(0, 0, -2));
    }
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  });
  return (
    <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
  );
}

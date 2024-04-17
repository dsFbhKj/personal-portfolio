import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
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

import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '/logo.png';

extend(geometry);
const regular = import('@pmndrs/assets/fonts/inter_regular.woff');
const medium = import('@pmndrs/assets/fonts/inter_medium.woff');

export default function World() {
  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <>
      {/* THE UNIVERSE */}
      <Canvas
        camera={{ fov: 75, position: [0, 0, 20] }}
        eventSource={document.getElementById('root')}
        eventPrefix='client'
      >
        <color attach='background' args={['#f0f0f0']} />
        <Frame id='01' name='room' author='Georgiana Barefield'>
          <Gltf src='fiesta_tea-transformed.glb' position={[0, -2, -3]} />
        </Frame>
        <Rig />
      </Canvas>

      {/* Bottom Nav */}
      {/* Make icons bigger and remove padding */}
      <div className='btm-nav btm-nav-md fixed'>
        <li
          role='button'
          className='tooltip hover:active flex justify-center'
          data-tip='World'
        >
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
          </a>
        </li>
        <li
          role='button'
          className='tooltip hover:active flex justify-center'
          data-tip='Home'
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
          </a>
        </li>
        <li
          role='button'
          className='tooltip hover:active flex justify-center'
          data-tip='Avatar'
        >
          <a href='/experience'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='w-6 h-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z'
              />
            </svg>
          </a>
        </li>
      </div>
    </>
  );
}
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

function Root() {
  const [, params] = useRoute('/item/:id');
  const [, setLocation] = useLocation();

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <a
          href='https://pmnd.rs/'
          style={{
            position: 'absolute',
            bottom: 40,
            left: 90,
            fontSize: '13px',
          }}
        >
          pmnd.rs <br /> dev collective
        </a>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            fontSize: '13px',
          }}
        >
          15/06/2023
        </div>
        <Logo
          style={{
            position: 'absolute',
            bottom: 40,
            left: 40,
            width: 30,
          }}
        />
        <a
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            fontSize: '13px',
          }}
          href='#'
          onClick={() => setLocation('/')}
        >
          {params ? '< back' : 'double click to enter portal'}
        </a>
      </div>
    </>
  );
}
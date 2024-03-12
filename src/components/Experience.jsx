import {
  ContactShadows,
  Environment,
  OrbitControls,
  Sky,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useControls } from 'leva';
import  Avatar  from './Avatar';

const Experience = () => {
  const { animation } = useControls({
    animation: {
      value: 'Hello',
      options: ['Hello', 'Standing', 'Falling'],
    },
  });
  return (
    <>
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 30 }}>
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
          <mesh scale={5} rotation-x={-Math.PI * 0.5} position-y={-0.001}>
            <planeGeometry />
            <meshStandardMaterial color='white' />
          </mesh>
        </group>
      </Canvas>
    </>
  );
};

export default Experience;
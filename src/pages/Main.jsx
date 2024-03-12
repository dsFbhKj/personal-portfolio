import { useSpring, animated } from '@react-spring/web'; //imported animation for react-spring
import AOS from 'aos'; //need both the import
import 'aos/dist/aos.css'; //and css for AOS to work
import { useEffect } from 'react';

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
    <>
      {/* Tested AOS Div animation wrapping it in daisy button */}
      {/* Tested out a button using daisy ui(tailwind) */}
      <button className='btn'>Button</button>
      <details className='dropdown'>
        <summary className='m-1 btn'>open or close</summary>
        <ul className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52'>
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </details>
      <button
        data-aos='fade-up-right'
        data-aos-duration='3000'
        className='inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900'
      >
        Button
      </button>

      {/* Add react spring Animation */}
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
    </>
  );
}
// export default function Main() {
//   return <h1 className='text-3xl font-bold underline'>Hello world!</h1>;
// }
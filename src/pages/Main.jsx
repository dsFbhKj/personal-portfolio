import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Main.module.css';
import logo from '/logo.png';
import React, { useRef, useEffect } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import me from '/images/me.png';
import mebear from '/images/mebear.png';
import meinline from '/images/meinline.png';
import meofficer from '/images/meofficer.png';
import mewinner from '/images/mewinner.png';
import pic2 from '/images/pic2.png';
import pic3 from '/images/pic3.png';
// Little helpers ...
const url = (name, wrap = false) =>
  `${
    wrap ? 'url(' : ''
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ')' : ''
  }`;

export default function Main() {
  const parallax = useRef(null);
  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <>
      {/* Paralax Scroll */}
      <div style={{ width: '100%', height: '100%', background: '#253237' }}>
        <Parallax ref={parallax} pages={3}>
          <ParallaxLayer
            offset={1}
            speed={1}
            style={{ backgroundColor: '#805E73' }}
          />
          <ParallaxLayer
            offset={2}
            speed={1}
            style={{ backgroundColor: '#87BCDE' }}
          />

          <ParallaxLayer
            offset={0}
            speed={0}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />

          <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
            <img
              src={url('cloud')}
              style={{ display: 'block', width: '20%', marginLeft: '55%' }}
            />
            <img
              src={url('cloud')}
              style={{ display: 'block', width: '10%', marginLeft: '15%' }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
            <img
              src={url('cloud')}
              style={{ display: 'block', width: '20%', marginLeft: '70%' }}
            />
            <img
              src={url('cloud')}
              style={{ display: 'block', width: '20%', marginLeft: '40%' }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
            <img
              src={url('cloud')}
              style={{ display: 'block', width: '10%', marginLeft: '10%' }}
            />
            <img
              src={url('cloud')}
              style={{ display: 'block', width: '20%', marginLeft: '75%' }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
            <img
              src={url('cloud')}
              style={{ display: 'block', width: '20%', marginLeft: '60%' }}
            />
            <img
              src={url('cloud')}
              style={{ display: 'block', width: '25%', marginLeft: '30%' }}
            />
            <img
              src={url('cloud')}
              style={{ display: 'block', width: '10%', marginLeft: '80%' }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
            <img
              src={url('cloud')}
              style={{ display: 'block', width: '20%', marginLeft: '5%' }}
            />
            <img
              src={url('cloud')}
              style={{ display: 'block', width: '15%', marginLeft: '75%' }}
            />
          </ParallaxLayer>

          <ParallaxLayer
            offset={0}
            speed={0.1}
            onClick={() => parallax.current.scrollTo(1)}
          >
            {/* TOP INFO */}
            <div className='flex flex-col items-center justify-center h-full text-white'>
              <h1 className='text-center mb-4'>Georgiana Barefield</h1>
              <p className='max-w-lg text-center'>
                I am a highly motivated and results-oriented aspiring Full-Stack
                Web Developer with a passion for creating user-friendly and
                effective web applications. Through a combination of academic
                coursework, internships, and extracurricular activities, I have
                honed my technical skills in programming languages like
                JavaScript and Python, and frameworks like Next.js and Node.js.
                I am also proficient in UI/UX design using Figma and wireframing
                techniques.
              </p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            offset={1}
            speed={0.1}
            // onClick={() => parallax.current.scrollTo(2)}
            className='text-white'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div>
              <section className='flex justify-center'>
                <div role='tablist' className='tabs tabs-bordered'>
                  <input
                    type='radio'
                    name='my_tabs_1'
                    role='tab'
                    className='tab text-white'
                    aria-label='Career Summary'
                  />
                  <div role='tabpanel' className='tab-content p-10'>
                    <h1>Full-Stack Web Developer</h1>
                    <p
                      className='flex justify-center items-center overflow-y-auto'
                      style={{ maxWidth: '800px' }}
                    >
                      Full-stack web developers are responsible for both the
                      front-end (user-interface) and back-end (server-side)
                      development of websites and web applications. They work
                      with a variety of technologies to create interactive and
                      functional web experiences.
                    </p>
                  </div>

                  <input
                    type='radio'
                    name='my_tabs_1'
                    role='tab'
                    className='tab text-white'
                    aria-label='Skills and Education Required'
                    checked
                  />
                  <div role='tabpanel' className='tab-content p-10'>
                    <h1>
                      <strong>Technical Skills</strong>
                    </h1>
                    <p>
                      HTML, CSS, Javascript, Front-end Frameworks(REACT,
                      ANGULAR), Back-End Languages (Python, Java), Databases
                      (SQL, MongoDB).
                    </p>
                    <h1>
                      <strong>Soft Skills</strong>
                    </h1>
                    <p>Teamwork, Problem-Solving, and Communication.</p>
                    <h1>
                      <strong>Educational Requirements</strong>
                    </h1>
                    <p>
                      Computer Science Degree, Coding Boot Camp Certificate
                      (although some companies may consider relevant experience
                      over formal education).
                    </p>
                  </div>

                  <input
                    type='radio'
                    name='my_tabs_1'
                    role='tab'
                    className='tab text-white'
                    aria-label='Future Job Outlook'
                  />
                  <div role='tabpanel' className='tab-content p-10'>
                    <p
                      className='flex justify-center items-center overflow-y-auto'
                      style={{ maxWidth: '800px' }}
                    >
                      The job outlook for web developers is projected to be much
                      faster than average, with a growth rate of 13% from 2020
                      to 2030 (bureau of labor statistics). The median annual
                      wage for web developers was $87,370 in may 2022 (bureau of
                      labor statistics)
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Vertical Slideshow */}
            <div className='h-96 carousel carousel-vertical rounded-box '>
              <div className='carousel-item h-full'>
                <img src={meinline} />
              </div>
              <div className='carousel-item h-full'>
                <img src={mewinner} />
              </div>
              <div className='carousel-item h-full'>
                <img src={me} />
              </div>
              <div className='carousel-item h-full'>
                <img src={meofficer} />
              </div>
              <div className='carousel-item h-full'>
                <img src={pic2} />
              </div>
              <div className='carousel-item h-full'>
                <img src={pic3} />
              </div>
              <div className='carousel-item h-full'>
                <img src={mebear} />
              </div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            offset={2}
            speed={-0}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => parallax.current.scrollTo(0)}
          >
            {/* MID INFO */}
            <div>
              <h1 className='flex justify-center'>My Experience</h1>
              <section>
                <div className='stats stats-vertical shadow'>
                  <div className='stat'>
                    Skills
                    <div className='stat-title'>HTML & CSS</div>
                    <div className='stat-value'>98%</div>
                  </div>

                  <div className='stat'>
                    <div className='stat-title'>Javascript</div>
                    <div className='stat-value'>85%</div>
                  </div>

                  <div className='stat'>
                    <div className='stat-title'>Python</div>
                    <div className='stat-value'>76%</div>
                  </div>
                </div>
              </section>
              <section>
                <h1>Projects</h1>
              </section>
              <section>{/* Social Media Links */}</section>
            </div>
          </ParallaxLayer>
        </Parallax>
      </div>

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
              fill='#000'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#000'
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
              stroke='#000'
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
              stroke='#000'
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

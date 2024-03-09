import{ useEffect } from 'react';
import me from '../assets/me.png'

const Main = () => {
  useEffect(() => {
    const handleMenuClick = (e) => {
      e.preventDefault(); 
      document.querySelector(".menu-overlay").classList.toggle("open"); 
      document.querySelector(".menu").classList.toggle("open"); }; 
      document.querySelector(".menu-link").addEventListener("click", handleMenuClick); 
      return () => { 
        document.querySelector(".menu-link").removeEventListener("click", handleMenuClick); 
      }; 
    }, []);

  return (
    <>
      <main>
        <h1 className='title'>Georgiana Barefield</h1>
        <hr />
        <h4 className='info'>
          A Data Analyst and Web Developer with a passion for using data to
          solve real-world problems.
        </h4>
        <h1 className='info-a'>WHO AM I?</h1>
        <p className='info-b'>
          As an accomplished leader, I possess a passion for my work that is
          matched only by my strong work ethic and boundless energy. Over the
          years, I have honed my expertise in programming languages, including
          but not limited to, Javascript and Python. During my high school
          years, I played a pivotal role in leading clubs and volunteering for
          various events. Despite my active involvement in multiple activities,
          I remain committed to my academic pursuits, with a rigorous schedule
          of taking AP & and Honors courses.
        </p>
        <img src={me} className='me' alt='img'/>
        <button className='button-3'>
          View My Projects
        </button>
      </main>
      <div className='menu'>
        <span className='menu-circle' />
        <a href='./' className='menu-link'>
          <span className='menu-icon'>
            <span className='menu-line menu-line-1' />
            <span className='menu-line menu-line-2' />
            <span className='menu-line menu-line-3' />
          </span>
        </a>
      </div>
      <div className='menu-overlay'>
        <div className='overlay-info'>Hello Everyone</div>
        <br />
        <img
          src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c3c11a4e-961b-47ec-8f72-acebce4c4562/dgd7lku-0c17b3b3-65fc-4bfc-8bf6-71a74ea3db63.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MzYzExYTRlLTk2MWItNDdlYy04ZjcyLWFjZWJjZTRjNDU2MlwvZGdkN2xrdS0wYzE3YjNiMy02NWZjLTRiZmMtOGJmNi03MWE3NGVhM2RiNjMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.XUrUlirAl1-iXhkhrp2MsdzPgSOSIsqd1kKVYTy1kf8'
          alt='just a img'
          width={'100px'}
          height={'75px'}
        />
      </div>
      
      {/* <div
        class='badge-base LI-profile-badge'
        data-locale='en_US'
        data-size='medium'
        data-theme='dark'
        data-type='VERTICAL'
        data-vanity='georgibarefield'
        data-version='v1'
      >
        <a
          class='badge-base__link LI-simple-link'
          href='https://www.linkedin.com/in/georgibarefield?trk=profile-badge'
        >
          Georgiana Barefield
        </a>
      </div> */}

      <footer className='footer-distributed'>
        <div className='footer-left'>
          <h3>Reach Out!</h3>

          <p className='footer-links'>
            <a href='./' className='link-1'>
              Home
            </a>

            <a href='./'>About</a>

            <a href='./'>Resume</a>

            <a href='./'>Projects</a>

            <a href='./'>Contact</a>
          </p>

          <p className='footer-company-name'>
            Copyright &copy; 2023 Georgiana Barefield
          </p>
        </div>

        <div className='footer-center'>
          <div>
            <i className='fa fa-map-marker'></i>
            <p>
              <span>Phoenix</span> Arizona, United States
            </p>
          </div>

          <div>
            <i className='fa fa-phone'></i>
            <p>+1.555.555.5555</p>
          </div>

          <div>
            <i className='fa fa-envelope'></i>
            <p>
              <a href='contactgeorgi7@gmail.com'>contactgeorgi7@gmail.com</a>
            </p>
          </div>
        </div>

        <div className='footer-right'>
          <p className='footer-company-about'>
            <span>About the company</span>
            Hello, my name is Georgiana Barefield, I'm in my junior year of high
            school. I'm enrolled in three schools: my home high school, West-Mec
            where I'm involed in a coding in programming technical class. In my
            spare time, I destress by dancing and programming I feel the freest
            when I create through my dance or projects.
          </p>

          <div className='footer-icons'>
            <a href='./'>
              <i className='fa fa-facebook'></i>
            </a>
            <a href='./'>
              <i className='fa fa-twitter'></i>
            </a>
            <a href='https://www.linkedin.com/in/georgibarefield'>
              <i className='fa fa-linkedin'></i>
            </a>
            <a href='https://github.com/gbaref949'>
              <i className='fa fa-github'></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Main;

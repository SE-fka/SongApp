import React, { useState, useEffect } from 'react';
import Link from '../Link/Link';

const Nav = () => {
  const [navClass, setNavClass] = useState('');
  const [toggeledNav, settoggeledNav] = useState(false);

  const toggleNav = () => {
    settoggeledNav(!toggeledNav);
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let navClass = '';
      if (window.scrollY >= 200) {
        navClass = 'scrolled';
      }
      setNavClass(navClass);
    });
  }, []);
  
  return (
    <nav className={`navbar navbar-expand-md bg-light ${navClass}`}>
      <div className='container'>
  
        <div
          className={`navbar-toggler nav-icon ${(() => {
            if (toggeledNav) return 'open';
            return '';
          })()}`}
          onClick={toggleNav}
        >
          <span />
          <span />
          <span />
        </div>

        <div
          className={`collapse navbar-collapse ${(() => {
            if (toggeledNav) return 'show';
            return '';
          })()}`}
        >
          <ul className='navbar-nav lg-auto' style={{paddingLeft:"10%"}}>
            <li className='nav-item' style={{paddingLeft:"10%"}}>
          
              <Link target='/' offset={-120} classes='nav-link'>
                 Home       
              </Link>
            </li>
            <li className='nav-item' style={{paddingLeft:"10%"}}>
              <Link target='song/lists' classes='nav-link'>
                Songs
              </Link>
            </li>
            <li className='nav-item' style={{ paddingLeft: '10%', whiteSpace: 'nowrap' }}>
             <Link target='song/add' classes='nav-link'>
              Add Song
            </Link>
            </li>
          </ul>
        </div>
      </div>
      
    </nav>
  );
};

export default Nav;

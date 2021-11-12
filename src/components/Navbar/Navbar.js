import React from 'react'

import navbarStyles from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={navbarStyles.nav}>
      <div>
        <a href="#c" className={navbarStyles.item}>Profile</a>
      </div>
      <div>
        <a href="#c" className={navbarStyles.item}>Messages</a>
      </div>
      <div>
        <a href="#c" className={navbarStyles.item}>News</a>
      </div>
      <div>
        <a href="#c" className={navbarStyles.item}>Music</a>
      </div>
      <div>
        <a href="#c" className={`${navbarStyles.item} ${navbarStyles.active}`}>Settings</a>
      </div>
    </nav>
  );
}

export default Navbar

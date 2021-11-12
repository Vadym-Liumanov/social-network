import React from 'react'

import styleNavbar from '../css/Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styleNavbar.nav}>
      <div>
        <a href="#c" className={styleNavbar.item}>Profile</a>
      </div>
      <div>
        <a href="#c" className={styleNavbar.item}>Messages</a>
      </div>
      <div>
        <a href="#c" className={styleNavbar.item}>News</a>
      </div>
      <div>
        <a href="#c" className={styleNavbar.item}>Music</a>
      </div>
      <div>
        <a href="#c" className={styleNavbar.item}>Settings</a>
      </div>
    </nav>
  );
}

export default Navbar

import React from 'react'

import navbarStyles from './Navbar.module.css'

import NavbarItem from './Item/NavbarItem';

const Navbar = () => {
  return (
    <nav className={navbarStyles.nav}>
      <NavbarItem value="Profile" />
      <NavbarItem value="Music" />
      <NavbarItem value="Settings" />
    </nav>
  );
}

export default Navbar

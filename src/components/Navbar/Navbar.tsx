import React from 'react'

import navbarStyles from './Navbar.module.css'

import NavbarItem from './Item/NavbarItem';

const Navbar: React.FC = () => {
  return (
    <nav className={navbarStyles.nav}>
      <NavbarItem value="Profile" url="/profile" />
      <NavbarItem value="Messages" url="/dialogs" />
      <NavbarItem value="Users" url="/users" />
      <NavbarItem value="News" url="/news" />
      <NavbarItem value="Music" url="/music" />
      <NavbarItem value="Settings" url="/settings" />
    </nav>
  );
}

export default Navbar

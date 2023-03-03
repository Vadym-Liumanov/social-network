import React from 'react'

import navbarStyles from './Navbar.module.css'

import NavbarItem from './Item/NavbarItem';

const Navbar: React.FC = () => {
  return (

    <aside className="aside">
      <div className="aside__menu menu">

        <div className="menu__prev-block">Something</div>

        <nav className="menu__body">
          <a href="#" className="menu__link menu__link_active">Login</a>
          <a href="#" className="menu__link">Profile</a>
          <a href="#" className="menu__link">Users</a>
          <a href="#" className="menu__link">Chat</a>
        </nav>

      </div>
    </aside>

    // <nav className={navbarStyles.nav}>
    //   <NavbarItem value="Profile" url="/profile" />
    //   <NavbarItem value="Messages" url="/dialogs" />
    //   <NavbarItem value="Users" url="/users" />
    //   <NavbarItem value="News" url="/news" />
    //   <NavbarItem value="Music" url="/music" />
    //   <NavbarItem value="Settings" url="/settings" />
    // </nav>
  );
}

export default React.memo(Navbar)

import React from 'react'
import { useSelector } from 'react-redux';

import cn from 'classnames'

import { getIsAuth } from '../../redux/auth-selectors';

const Navbar: React.FC = () => {

  const isAuth = useSelector(getIsAuth)

  return (
    <>
      {/* {isAuth && (
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
      )} */}
      
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
    </>
  );
}

export default React.memo(Navbar)

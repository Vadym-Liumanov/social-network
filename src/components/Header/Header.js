import React from 'react'
import { NavLink } from 'react-router-dom'

import headerStyles from './Header.module.css'
import logo from '../../assets/images/logo_nike.jpg'

const Header = (props) => {
  // debugger

  return (
    <header className={headerStyles.header}>
      <img src={logo} alt="logo" />
      <div className={headerStyles.loginBlock}>
        {props.isAuth
          ? (
            <div>
              <div>Hello {props.login}</div>
              {/* <div>Your id: {props.id}</div> */}
              <button onClick={props.logoutThunk}>Logout</button>
            </div>
          )
          : <NavLink to={'/login'}>Login</NavLink>}
      </div>
    </header>
  )
}

export default Header

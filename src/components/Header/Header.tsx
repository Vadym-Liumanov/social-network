import React from 'react'
import { NavLink } from 'react-router-dom'

import headerStyles from './Header.module.css'
import logo from '../../assets/images/logo_nike.jpg'

type PropsType = {
  isAuth: boolean
  login: string
  id: number
  logoutThunk: () => void
}

const Header: React.FC<PropsType> = (props) => {

  return (
    <header className={headerStyles.header}>
      <img src={logo} alt="logo" />
      <div className={headerStyles.loginBlock}>
        {props.isAuth
          ? (
            <div>
              <div>Hello {props.login}. Your id: {props.id}</div>
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

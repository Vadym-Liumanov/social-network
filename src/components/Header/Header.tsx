import React from 'react'
import { NavLink } from 'react-router-dom'

import headerStyles from './Header.module.css'
import logo from '../../assets/images/logo_nike.jpg'

import { StateType } from '../../redux/auth-reducer'

type PropsType = {
  authData: StateType
  logoutThunk: () => void
}

const Header: React.FC<PropsType> = ({ authData, logoutThunk }) => {

  return (
    <header className={headerStyles.header}>
      <img src={logo} alt="logo" />
      <div className={headerStyles.loginBlock}>
        {authData.isAuth
          ? (
            <div>
              <div>Hello {authData.login}. Your id: {authData.id}</div>
              {/* <div>Your id: {props.id}</div> */}
              <button onClick={logoutThunk}>Logout</button>
            </div>
          )
          : <NavLink to={'/login'}>Login</NavLink>}
      </div>
    </header>
  )
}

export default Header

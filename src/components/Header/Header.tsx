import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import headerStyles from './Header.module.css'
import logo from '../../assets/images/logo_nike.jpg'

import { logoutThunk } from '../../redux/auth-reducer'
import { getAuthData } from '../../redux/auth-selectors'

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const authData = useSelector(getAuthData)
  const logout = () => dispatch(logoutThunk())

  return (
    <header className={headerStyles.header}>
      <img src={logo} alt="logo" />
      <div className={headerStyles.loginBlock}>
        {authData.isAuth
          ? (
            <div>
              <div>Hello {authData.login}. Your id: {authData.id}</div>
              {/* <div>Your id: {props.id}</div> */}
              <button onClick={logout}>Logout</button>
            </div>
          )
          : <Link to={'/login'}>Login</Link>}
      </div>
    </header>
  )
}

export default React.memo(Header)

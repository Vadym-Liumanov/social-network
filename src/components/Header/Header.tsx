import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import cn from 'classnames'

import styles from './Header.module.css'

import { logoutThunk } from '../../redux/auth-reducer'
import { getAuthData, getIsAuth } from '../../redux/auth-selectors'

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const authData = useSelector(getAuthData)
  const isAuth = useSelector(getIsAuth)
  const logout = () => dispatch(logoutThunk())

  return (

    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__row}>

          <Link to='/' className={styles.header__logo}>
            <strong>IT</strong> Social
          </Link>

          <div className={styles.header__block}>

            {isAuth &&

              <div className={styles.header__authBlock}>
                <div>
                  <button onClick={logout}>Logout</button>
                </div>
                <div className={styles.header__avatar}>
                </div>
              </div>
            }

            {/* Burger */}

            <div className={cn(styles.header__menu, styles.burger)}>
              <span></span>
            </div>

          </div>
        </div>
      </div>
    </header>

    // <header className={styles.header}{headerStyles.header}>
    //   <img src={logo} alt="logo" />
    //   <div className={styles.header}{headerStyles.loginBlock}>
    //     {authData.isAuth
    //       ? (
    //         <div>
    //           <div>Hello {authData.login}. Your id: {authData.id}</div>
    //           {/* <div>Your id: {props.id}</div> */}
    //           <button onClick={logout}>Logout</button>
    //         </div>
    //       )
    //       : <Link to={'/login'}>Login</Link>}
    //   </div>
    // </header>
  )
}

export default React.memo(Header)

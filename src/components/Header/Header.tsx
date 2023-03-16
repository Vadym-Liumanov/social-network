import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import cn from 'classnames'

import styles from './Header.module.css'

import { logoutThunk } from '../../redux/auth-reducer'
import { getAuthData, getIsAuth } from '../../redux/auth-selectors'
import { getProfileInfo } from '../../redux/profile-selectors'
import Menu from '../Menu/Menu'
import defaultUserImage from './../../assets/images/defaultUserImage.jpg'

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const authData = useSelector(getAuthData)
  const isAuth = useSelector(getIsAuth)
  const logout = () => dispatch(logoutThunk())
  const profileInfo = useSelector(getProfileInfo)

  const [burgerOn, setBurgerOn] = useState(false)

  const onBurgerClick = () => {
    setBurgerOn((prevState) => prevState ? false : true)
    document.body.classList.toggle('_scrolling-lock')
  }

  const onLinkClick = (event: Event) => {
    // event.preventDefault()
    setBurgerOn(false)
    document.body.classList.remove('_scrolling-lock')
  }

  return (

    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__row}>

          <Link to='/' className={styles.header__logo}>
            <strong>IT</strong> Social
          </Link>

          {isAuth &&
            <div className={styles.header__block}>
              <div className={styles.header__authBlock}>
                <div>
                  <button onClick={logout}>Logout</button>
                </div>
                <div className={styles.header__avatar}>
                  <img
                    src={profileInfo && profileInfo.photos.large ? profileInfo.photos.large : defaultUserImage}
                    alt="userAvatar"
                    className={styles.avatar}
                  />
                  <div className={styles.avatarToolpTip}>
                    <p>{`Hello, ${authData.login}.`}</p>
                    <p>{`Your id: ${authData.id}`}</p>
                  </div>
                </div>
              </div>
              {/* Burger */}

              <button onClick={onBurgerClick}>
                <div className={cn(styles.header__menu, styles.burger, {
                  [styles._active]: burgerOn
                })}>
                  <span></span>
                </div>
              </button>
            </div>
          }


          {
            burgerOn && ReactDOM.createPortal(
              <div className={styles.burgerMenu}>
                <div className={styles.menuWrapper}>
                  <Menu onLinkClick={onLinkClick} />
                </div>
              </div>
              , document.getElementById('root') as Element)
          }

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

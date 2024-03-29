import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import cn from 'classnames'

import LoginReduxForm, { LoginFormValuesType } from './LoginReduxForm/LoginReduxForm'

import { loginThunk } from '../../redux/auth-reducer'
// import { getCaptchaUrl, getIsAuth, getIsFetching } from '../../redux/auth-selectors'
import { getAuthData } from '../../redux/auth-selectors'

import styles from './LoginPage.module.css'

const LoginPage: React.FC = () => {
  // Todo: Enable Preloader when data is fetching
  const dispatch = useDispatch()
  const login = (email: string, password: string, rememberMe: boolean, captcha: string | null) =>
    dispatch(loginThunk(email, password, rememberMe, captcha))

  // const isAuth = useSelector(getIsAuth)
  // const captchaUrl = useSelector(getCaptchaUrl)
  // const isFetching = useSelector(getIsFetching)
  const authData = useSelector(getAuthData)

  const { isAuth, captchaUrl, isFetching, id } = authData


  /* onSubmit передается в пропсах в child component и определяет,
  что делать с собранными формой данными formData.
  Используем эти formData (через деструктуризацию) для логинизации -
  диспатчим из onSubmit formData через POST запрос на API для
  авторизации на сервере стороннего сервиса */

  const onSubmit = (formData: LoginFormValuesType) => {
    const { email, password, rememberMe, captcha } = formData
    login(email, password, rememberMe, captcha)
  }

  if (isAuth) {
    return <Navigate replace to={`/profile/${id}`} />
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginPage}>

        {/* Form */}

        <div className={cn(styles.loginPage__card, styles.loginPage__cardForm)}>
          <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} isFetching={isFetching} />
        </div>

        {/* Form notice */}

        <div className={cn(styles.loginPage__card, styles.loginPage__cardNotice)}>
          <div className={styles.loginPage__notice}>
            <div className={styles.notice__title}>Test account details:</div>
            <span className={styles.notice__emailKey}>Email:</span> <strong className={styles.notice__emailVal}>free@samuraijs.com</strong>
            <span className={styles.notice__passKey}>Password:</span> <strong className={styles.notice__passVal}>free</strong>
          </div>
        </div>


      </div>
    </div>
  )

}

export default React.memo(LoginPage)
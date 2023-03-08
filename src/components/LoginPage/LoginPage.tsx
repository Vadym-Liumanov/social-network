import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

import LoginReduxForm, { LoginFormValuesType } from './LoginReduxForm'

import { loginThunk } from '../../redux/auth-reducer'
import { getCaptchaUrl, getIsAuth, getIsFetching } from '../../redux/auth-selectors'

import styles from './LoginPage.module.css'

const LoginPage: React.FC = () => {
  // Todo: Enable Preloader when data is fetching
  const dispatch = useDispatch()
  const login = (email: string, password: string, rememberMe: boolean, captcha: string | null) => dispatch(loginThunk(email, password, rememberMe, captcha))

  const isAuth = useSelector(getIsAuth)
  const captchaUrl = useSelector(getCaptchaUrl)
  const isFetching = useSelector(getIsFetching)

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
    return <Navigate replace to='/profile' />
  }

  return (
    <div className={styles.loginCard}>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} isFetching={isFetching} />
    </div>
  )
}

export default React.memo(LoginPage)
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Redirect } from 'react-router-dom'

import LoginReduxForm, { LoginFormValuesType } from './LoginReduxForm'

import { loginThunk } from '../../redux/auth-reducer'
import { getCaptchaUrl, getIsAuth } from '../../redux/auth-selectors'

const Login: React.FC = () => {
  // Todo: Enable Preloader when data is fetching
  const dispatch = useDispatch()
  const login = (email: string, password: string, rememberMe: boolean, captcha: string | null) => dispatch(loginThunk(email, password, rememberMe, captcha))

  const isAuth = useSelector(getIsAuth)
  const captchaUrl = useSelector(getCaptchaUrl)

  /* onSubmit передается в пропсах в child component и определяет,
  что делать с собранными формой данными formData.
  Используем эти formData (через деструктуризацию) для логинизации -
  диспатчим из onSubmit formData через POST запрос на API для
  авторизации на сервере стороннего сервиса */

  const onSubmit = (formData: LoginFormValuesType) => {
    login(formData.email, formData.password, formData.rememberMe, formData.captcha)
  }

  if (isAuth) {
    return <Redirect to='/profile' />
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  )
}

export default React.memo(Login)
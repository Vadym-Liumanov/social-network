import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import LoginReduxForm, { LoginFormValuesType } from './LoginReduxForm'

import { loginThunk } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/store-redux'

type MapStatePropsType = {
  isAuth: boolean
  captchaUrl: string | null
}

type MapDispatchPropsType = {
  loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}

type LoginPropsType = MapStatePropsType & MapDispatchPropsType

const Login: React.FC<LoginPropsType> = (props) => {

  /* onSubmit передается в пропсах в child component и определяет,
  что делать с собранными формой данными formData
  Используем эти formData (через деструктуризацию) для логинизации -
  диспатчим из onSubmit formData через POST запрос на API для
  авторизации на стороннем сервисе */

  const onSubmit = (formData: LoginFormValuesType) => {
    props.loginThunk(formData.email, formData.password, formData.rememberMe, formData.captcha)
  }

  if (props.isAuth) {
    return <Redirect to='/profile' />
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  )
}



const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
  }
}

const mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
  return {
    loginThunk: (email, password, rememberMe, captcha) => dispatch(loginThunk(email, password, rememberMe, captcha))
  }
}

export default connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(mapStateToProps, mapDispatchToProps)(Login)
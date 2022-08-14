import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import LoginReduxForm from './LoginReduxForm'

import { loginThunk } from '../../redux/auth-reducer'

const Login = (props) => {

  /* onSubmit передается в пропсах в child component и определяет,
  что делать с собранными формой данными formData
  Используем эти formData (через деструктуризацию) для логинизации -
  диспатчим из onSubmit formData через POST запрос на API для
  авторизации на стороннем сервисе */

  const onSubmit = ({ email, password, rememberMe, captcha }) => {
    props.loginThunk(email, password, rememberMe, captcha)
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

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginThunk: (email, password, rememberMe, captcha) => dispatch(loginThunk(email, password, rememberMe, captcha))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
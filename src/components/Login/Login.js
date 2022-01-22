import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

import { loginThunk } from '../../redux/auth-reducer'

import { required } from '../../utils/validators/validators'
import { Element } from '../common/FormsControls/FormsControls'

import styles from './Login.module.css'


const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Element} placeholder={'Email'} name={'email'} elementtype='input' validate={[required]} />
      </div>
      <div>
        <Field component={Element} placeholder={'Password'} name={'password'} elementtype='input' type='password' validate={[required]} />
      </div>
      <div>
        <Field component={'input'} type={'checkbox'} name={'rememberMe'} /> Remember me
      </div>
      {props.error &&
        <div className={styles.formSummaryError}>
          {props.error}
        </div>
      }
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {

  // onSubmit передается в пропсах в child component и определяет,
  // что делать с собранными формой данными formData
  // Используем эти formData (через деструктуризацию) для логинизации -
  // диспатчим из onSubmit formData через POST запрос на API для
  // авторизации на стороннем сервисе

  const onSubmit = ({ email, password, rememberMe }) => {
    props.loginThunk(email, password, rememberMe)
  }

  if (props.isAuth) {
    return <Redirect to='/profile' />
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginThunk: (email, password, rememberMe) => dispatch(loginThunk(email, password, rememberMe))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
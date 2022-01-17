import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { loginThunk } from '../../redux/auth-reducer'

import { required } from '../../utils/validators/validators'
import { Element } from '../common/FormsControls/FormsControls'


const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Element} placeholder={'Email'} name={'email'} elementType='input' validate={[required]} />
      </div>
      <div>
        <Field component={Element} placeholder={'Password'} name={'password'} elementType='input' type='password' validate={[required]} />
      </div>
      <div>
        <Field component={'input'} type={'checkbox'} name={'rememberMe'} /> Remember me
      </div>
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
  // надо будет использовать эти formData для логинизации в дальнейшем -
  // диспатчить из onSubmit formData в state и т.д.

  const onSubmit = ({ email, password, rememberMe }) => {
    props.loginThunk(email, password, rememberMe)
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

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginThunk: (email, password, rememberMe) => dispatch(loginThunk(email, password, rememberMe))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
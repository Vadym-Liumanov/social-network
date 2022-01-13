import React from 'react'
import { Field, reduxForm } from 'redux-form'

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={'input'} placeholder={'Login'} name={'login'} />
      </div>
      <div>
        <Field component={'input'} placeholder={'Password'} name={'password'} />
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

  const onSubmit = (formData) => {
    console.log(formData)
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit}/>
    </div>
  )
}

export default Login
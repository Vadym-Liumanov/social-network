import React from 'react'
import { Field, reduxForm } from 'redux-form'

import styles from './Login.module.css'
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
      {props.captchaUrl && <div><img src={props.captchaUrl} alt="captcha" /></div>}
      {props.captchaUrl &&
        <div>
          <Field component={Element} placeholder={'captcha'} name={'captcha'} elementType='input' type='text' validate={[required]} />
        </div>}
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

export default LoginReduxForm
import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'

import styles from './Login.module.css'
import { required } from '../../utils/validators/validators'
import { Element } from '../common/FormsControls/FormsControls'

export type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string | null
}

type LoginFormOwnPropsType = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field component={Element} placeholder={'Email'} name={'email'} elementType='input' validate={[required]} />
      </div>
      <div>
        <Field component={Element} placeholder={'Password'} name={'password'} elementType='input' type='password' validate={[required]} />
      </div>
      <div>
        <Field component={'input'} type={'checkbox'} name={'rememberMe'} /> Remember me
      </div>
      {captchaUrl && <div><img src={captchaUrl} alt="captcha" /></div>}
      {captchaUrl &&
        <div>
          <Field component={Element} placeholder={'captcha'} name={'captcha'} elementType='input' type='text' validate={[required]} />
        </div>}
      {error &&
        <div className={styles.formSummaryError}>
          {error}
        </div>
      }
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({ form: 'login' })(LoginForm)

export default LoginReduxForm
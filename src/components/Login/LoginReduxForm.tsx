import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'

import styles from './Login.module.css'
import { required } from '../../utils/validators/validators'
import { textInput, checkboxInput } from '../common/FormsControls/FormsControls'

export type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string | null
}

type LoginFormOwnPropsType = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({ handleSubmit, error, captchaUrl, submitting }) => {
  return (
    <form className="login-card__form login-form" onSubmit={handleSubmit}>

      <Field
        name='email'
        type='email'
        component={textInput}
        placeholder='Email'
        validate={[required]}
        label='Email'
        id="login-email"
      />

      <Field
        name='password'
        type='password'
        component={textInput}
        placeholder='Password'
        validate={[required]}
        label='Password'
        id="login-password"
      />

      <Field
        name='rememberMe'
        elementType='input'
        type='checkbox'
        component={checkboxInput}
        label='Remember me'
        id="login-remember-me"
      />

      {/* <Field component={'input'} type={'checkbox'} name={'rememberMe'} /> Remember me */}

      {captchaUrl &&
        <div>
          <div>
            <img src={captchaUrl} alt="captcha" />
          </div>
          <div>
            <Field component={textInput} placeholder={'captcha'} name={'captcha'} elementType='input' type='text' validate={[required]} />
          </div>
        </div>}
      {error &&
        <div className={styles.formSummaryError}>
          {error}
        </div>
      }

      <div className="login-form__item item-for-button">
        <div className="item-for-button__button-block">
          <button className="login-form__button submit-button" type="submit" disabled={submitting}>Login</button>
        </div>
      </div>


      {/* <div>
        <button disabled={submitting}>Login</button>
      </div> */}
    </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({ form: 'login' })(LoginForm)

export default LoginReduxForm
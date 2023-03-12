import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import cn from 'classnames'

import { required, email } from '../../../utils/validators/validators'
import { loginInput, loginCheckbox } from '../../common/FormsControls/FormsControls'

import styles from './LoginReduxForm.module.css'

import btnPreloader from '../../../assets/preloaders/circle.svg'
import LoginButton from '../../common/Battons/LoginButton/LoginButton'

export type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string | null
}

type LoginFormOwnPropsType = {
  captchaUrl: string | null
  isFetching: boolean
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType,
  LoginFormOwnPropsType> & LoginFormOwnPropsType>
  = ({ handleSubmit, error, captchaUrl, submitting, isFetching }) => {

    return (
      <form className={styles.loginForm} onSubmit={handleSubmit}>

        <Field
          name='email'
          type='email'
          component={loginInput}
          placeholder='Email'
          validate={[required, email]}
          label='Email'
          id="login-email"
          requiredField={true}
        />

        <Field
          name='password'
          type='password'
          component={loginInput}
          placeholder='Password'
          validate={[required]}
          label='Password'
          id="login-password"
          requiredField={true}
        />

        <Field
          name='rememberMe'
          type='checkbox'
          component={loginCheckbox}
          label='Remember me'
          id="login-remember-me"
        />

        {captchaUrl &&
          <>

            <div className={styles.loginForm__captchaImg}>
              <img src={captchaUrl} alt="captcha" className={styles.captchaImg} />
            </div>

            <Field
              name='captcha'
              type='text'
              component={loginInput}
              placeholder='Captcha'
              validate={[required]}
              label='Captcha'
              id="login-captcha"
              requiredField={true}
            />

          </>}

        {error &&
          <div className={styles.loginForm__errorOnSubmit}>
            <div className={styles.errorOnSubmit}>
              {error}
            </div>
          </div>
        }

        <div className={styles.loginForm__button}>
          <div className={styles.button}>
            <LoginButton isDisabled={submitting} isFetching={isFetching} text="Login" />
          </div>
        </div>

      </form>
    )
  }

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({ form: 'login' })(LoginForm)

export default LoginReduxForm
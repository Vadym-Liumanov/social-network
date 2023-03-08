import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'

import { required } from '../../utils/validators/validators'
import { textInput, checkboxInput } from '../common/FormsControls/FormsControls'

import btnPreloader from '../../assets/preloaders/circle.svg'

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
          <>
            <div className="login-form__item item-for-captcha-img">
              <div className="item-for-captcha-img__captcha-block">
                <img src={captchaUrl} alt="captcha" />
              </div>
            </div>

            {/* <div>
            <img src={captchaUrl} alt="captcha" />
          </div> */}

            <Field
              name='captcha'
              type='text'
              component={textInput}
              placeholder='Captcha'
              validate={[required]}
              label='Captcha'
              id="login-captcha"
            />

            {/* <div>
            <Field  placeholder={'captcha'}  elementType='input'  validate={[required]} />
          </div> */}

          </>}

        {error &&
          <div className="login-form__item item-for-error-on-submit">
            <div className="login-form__error-on-submit">
              {error}
            </div>
          </div>
        }

        <div className="login-form__item item-for-button">
          <div className="item-for-button__button-block">
            <button className="login-form__button submit-button" type="submit" disabled={submitting}>
              {isFetching &&
                <img src={btnPreloader} alt="" />
              }
              <span>Login</span>
            </button>
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
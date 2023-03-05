import React from 'react'
import { WrappedFieldProps } from 'redux-form'

import styles from './FormsControls.module.css'

type ElementOwnPropsType = {
  label?: string
  id?: string
}

export const textInput: React.FC<WrappedFieldProps & ElementOwnPropsType> = ({ input, meta, ...props }) => {
  const hasError: boolean = meta.touched && meta.error

  return (
    <div className="login-form__item item-for-input">
      <label className="login-form__label label-required label-for-input" htmlFor={props.id}>{props.label}</label>
      <input {...input} {...props} className="login-form__input form-input" />
      <div className="login-form__input-error form-input-error">
        {hasError && <span>{meta.error}</span>}
      </div>
    </div>
  )
}

export const checkboxInput: React.FC<WrappedFieldProps & ElementOwnPropsType> = ({ input, meta, ...props }) => {
  const hasError: boolean = meta.touched && meta.error

  return (
    <div className="login-form__item item-for-checkbox">
      <div className="item-for-checkbox__checkbox-block">
        <input {...input} {...props} className="login-form__checkbox form-checkbox" />
        <label className="login-form__label label-for-checkbox" htmlFor={props.id}>{props.label}</label>
      </div>
    </div>
  )
  //   <div class="login-form__item item-for-checkbox">
  //   <div class="item-for-checkbox__checkbox-block">
  //     <input class="login-form__checkbox form-checkbox" type="checkbox" name="" id="login-remember-me">
  //     <label class="login-form__label label-for-checkbox" for="login-remember-me">Remember me</label>
  //   </div>
  // </div>

}




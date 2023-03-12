import React from 'react'
import { WrappedFieldProps } from 'redux-form'

import cn from 'classnames'

import styles from './FormsControls.module.css'

type ElementOwnPropsType = {
  label?: string
  id?: string
  requiredField?: boolean
}

export const loginInput: React.FC<WrappedFieldProps & ElementOwnPropsType> = ({ input, meta, ...props }) => {

  const hasError: boolean = meta.touched && meta.error

  return (
    <div className={styles.loginInput__body}>
      <label className={cn(styles.loginInput__label, styles.label, { [styles.requiredLabel]: props.requiredField })} htmlFor={props.id}>{props.label}</label>
      <input {...input} {...props} className={cn(styles.loginInput__input, styles.input)} />
      <div className={cn(styles.loginInput__error, styles.error)}>
        {hasError && <span>{meta.error}</span>}
      </div>
    </div>
  )
}


export const loginCheckbox: React.FC<WrappedFieldProps & ElementOwnPropsType> = ({ input, meta, ...props }) => {

  return (
    <div className={styles.loginCheckbox__body}>
      <div className={styles.loginCheckbox__block}>
        <input {...input} {...props} className={cn(styles.loginCheckbox__checkbox, styles.checkbox)} />
        <label className={styles.loginCheckbox__label} htmlFor={props.id}>{props.label}</label>
      </div>
    </div>
  )
}
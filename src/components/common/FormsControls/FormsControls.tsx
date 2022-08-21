import React from 'react'
import { WrappedFieldProps } from 'redux-form'

import styles from './FormsControls.module.css'

type ElementOwnPropsType = {
  elementType: React.FC<WrappedFieldProps & any>
}

export const Element: React.FC<WrappedFieldProps & ElementOwnPropsType> = ({ input, meta, elementType: ElementType, ...props }) => {
  debugger
  const hasError: boolean = meta.touched && meta.error

  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
      <div>
        <ElementType {...input} {...props} />
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  )
}
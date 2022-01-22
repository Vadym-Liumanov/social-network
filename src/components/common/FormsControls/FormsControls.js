import React from 'react'

import styles from './FormsControls.module.css'

export const Element = ({ input, meta, ...props }) => {
  // debugger

  const hasError = meta.touched && meta.error

  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
      <div>
        <props.elementType {...input} {...props} />
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  )
}
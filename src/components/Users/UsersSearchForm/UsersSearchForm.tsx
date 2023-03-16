import React from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { UsersFilterType } from '../../../redux/users-reducer'

import styles from './UsersSearchForm.module.css'

// Todo: add ResetFilter Button

type PropsType = {
  usersFilter: UsersFilterType
  onChangeUsersFilter: (usersFilter: UsersFilterType) => void
}

const UsersSearchForm: React.FC<PropsType> = ({ usersFilter, onChangeUsersFilter }) => {
  type FormValuesType = {
    term: string
    friend: 'true' | 'false' | 'null'
  }

  const initialFormValues: FormValuesType = {
    term: usersFilter.term,
    friend: usersFilter.friend === null ? 'null' : usersFilter.friend === true ? 'true' : 'false'
  }

  const formValidate = (values: FormValuesType) => {
    const errors = {}
    return errors
  }

  const onFormSubmit = (values: FormValuesType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filter: UsersFilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
    }
    onChangeUsersFilter(filter)
    setSubmitting(false)
  }

  return (
    <div className={styles.wrapper}>
      <Formik
        enableReinitialize
        initialValues={initialFormValues}
        validate={formValidate}
        onSubmit={onFormSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <Field type="text" name="term" className={styles.input} />
            <ErrorMessage name="term" component="div" className={styles.error}/>
            <Field as="select" name="friend" className={styles.select} >
              <option value="null" className={styles.option}>All users</option>
              <option value="true" className={styles.option}>Only Followed</option>
              <option value="false" className={styles.option}>Only UnFollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting} className={styles.btn}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default React.memo(UsersSearchForm)
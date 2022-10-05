import React from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { UsersFilterType } from '../../../redux/users-reducer'

type PropsType = any

const UsersSearchForm: React.FC<PropsType> = (props) => {
  type FormValuesType = UsersFilterType

  const initialFormValues: FormValuesType = {
    term: '',
    friend: null
  }

  const formValidate = (values: FormValuesType) => {
    const errors = {}
    return errors
  }

  const onFormSubmit = (values: FormValuesType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    // alert(JSON.stringify(values, null, 2))
    props.setUsersFilter(values)
    setSubmitting(false)
  }

  return (
    <div>
      <Formik
        initialValues={initialFormValues}
        validate={formValidate}
        onSubmit={onFormSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <ErrorMessage name="term" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default UsersSearchForm
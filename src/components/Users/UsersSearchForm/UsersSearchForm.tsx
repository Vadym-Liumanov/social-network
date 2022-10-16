import React from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { UsersFilterType } from '../../../redux/users-reducer'

type PropsType = {
  usersFilter: UsersFilterType
  onChangeUsersFilter: (usersFilter: UsersFilterType) => void
}

const UsersSearchForm: React.FC<PropsType> = ({ usersFilter, onChangeUsersFilter }) => {
  type FormValuesType = UsersFilterType

  const initialFormValues: FormValuesType = usersFilter

  const formValidate = (values: FormValuesType) => {
    const errors = {}
    return errors
  }

  const onFormSubmit = (values: FormValuesType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    // alert(JSON.stringify(values, null, 2))
    onChangeUsersFilter(values)
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
            <Field as="select" name="friend">
              <option value="null">All users</option>
              <option value="true">Only followed users</option>
              <option value="false">Only unFollowed users</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default React.memo(UsersSearchForm)
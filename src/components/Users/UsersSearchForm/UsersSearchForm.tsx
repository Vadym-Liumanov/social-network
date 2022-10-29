import React from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { UsersFilterType } from '../../../redux/users-reducer'

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
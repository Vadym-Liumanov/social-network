import React from 'react'
import { Field, reduxForm } from 'redux-form'
// import styles from './ProfileForm.module.css'
import { required } from '../../../../../utils/validators/validators'
import { Element } from '../../../../common/FormsControls/FormsControls'


const ProfileForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Element} placeholder={'fullName'} name={'fullName'} elementType='input' validate={[required]} />
      </div>
      <div>
        <Field component={Element} placeholder={'aboutMe'} name={'aboutMe'} elementType='textarea' validate={[required]} />
      </div>
      <div>
        <Field component={Element} name={'lookingForAJob'} elementType='input' type={'checkbox'} validate={[]} />
      </div>
      <div>
        <Field component={Element} placeholder={'lookingForAJobDescription'} name={'lookingForAJobDescription'} elementType='textarea' validate={[]} />
      </div>
      <div>
        {Object.keys(props.profileDetails.contacts).map((contact) => {
          return (
            <div key={contact}>
              <Field component={Element} placeholder={contact} name={`contacts.${contact}`} elementType='input' validate={[]} />
            </div>
          )
        })}
      </div>
      <button>Save</button>
    </form>
  )
}

const ProfileReduxForm = reduxForm({ form: 'profile' })(ProfileForm)

export default ProfileReduxForm
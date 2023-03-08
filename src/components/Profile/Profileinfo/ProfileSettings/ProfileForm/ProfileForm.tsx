import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { ProfileType } from '../../../../../types/types'
// import styles from './ProfileForm.module.css'
import { required } from '../../../../../utils/validators/validators'
// import { textInput } from '../../../../common/FormsControls/FormsControls'

// export type ProfileFormValuesType = {
//   fullName: string | null
//   aboutMe: string | null
//   lookingForAJob: boolean | null
//   lookingForAJobDescription: string | null
// }
type ProfileFormValuesType = ProfileType

type ProfileFormOwnPropsType = {
  initialValues: ProfileType
  profileDetails: ProfileType
}

const ProfileForm: React.FC<InjectedFormProps<ProfileFormValuesType, ProfileFormOwnPropsType> & ProfileFormOwnPropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {/* <div>
        <Field component={textInput} placeholder={'fullName'} name={'fullName'} elementType='input' validate={[required]} />
      </div>
      <div>
        <Field component={Element} placeholder={'aboutMe'} name={'aboutMe'} elementType='textarea' validate={[required]} />
      </div>
      <div>
        <Field component={textInput} name={'lookingForAJob'} elementType='input' type={'checkbox'} validate={[]} />
      </div>
      <div>
        <Field component={textInput} placeholder={'lookingForAJobDescription'} name={'lookingForAJobDescription'} elementType='textarea' validate={[]} />
      </div>
      <div>
        {Object.keys(props.profileDetails.contacts).map((contact) => {
          return (
            <div key={contact}>
              <Field component={textInput} placeholder={contact} name={`contacts.${contact}`} elementType='input' validate={[]} />
            </div>
          )
        })}
      </div>
      {props.error && <div>{props.error}</div>}
      <button>Save</button> */}
    </form>
  )
}

const ProfileReduxForm = reduxForm<ProfileFormValuesType, ProfileFormOwnPropsType>({ form: 'profile' })(ProfileForm)

export default ProfileReduxForm
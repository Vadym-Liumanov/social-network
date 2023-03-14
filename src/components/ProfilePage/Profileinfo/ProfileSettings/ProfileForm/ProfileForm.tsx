import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'

import styles from './ProfileForm.module.css'
import { ProfileType } from '../../../../../types/types'
import { required } from '../../../../../utils/validators/validators'
import { profileInput, profileCheckbox, profileTextarea } from '../../../../common/FormsControls/FormsControls'

import LoginButton from '../../../../common/Battons/LoginButton/LoginButton'

type ProfileFormValuesType = ProfileType

type ProfileFormOwnPropsType = {
  initialValues: ProfileType
  profileDetails: ProfileType
  isFetching: boolean
}

const ProfileForm: React.FC<InjectedFormProps<ProfileFormValuesType,
  ProfileFormOwnPropsType> & ProfileFormOwnPropsType> = (props) => {

    const ProfileContacts = [
      {
        name: 'github',
        placeholder: 'Github',
        label: 'Github',
        id: 'profileForm-github'
      },
      {
        name: 'vk',
        placeholder: 'VK',
        label: 'VK',
        id: 'profileForm-vk'
      },
      {
        name: 'facebook',
        placeholder: 'Facebook',
        label: 'Facebook',
        id: 'profileForm-facebook'
      },
      {
        name: 'instagram',
        placeholder: 'Instagram',
        label: 'Instagram',
        id: 'profileForm-instagram'
      },
      {
        name: 'twitter',
        placeholder: 'Twitter',
        label: 'Twitter',
        id: 'profileForm-twitter'
      },
      {
        name: 'youtube',
        placeholder: 'Youtube',
        label: 'Youtube',
        id: 'profileForm-youtube'
      },
      {
        name: 'website',
        placeholder: 'Website',
        label: 'Website',
        id: 'profileForm-website'
      },
      {
        name: 'mainLink',
        placeholder: 'Main link',
        label: 'Main link',
        id: 'profileForm-mainLink'
      }
    ]

    const ContactsInputsGroup = ProfileContacts.map((contact) => {
      return (
        <div key={contact.name}>
          <Field
            name={`contacts.${contact.name}`}
            component={profileInput}
            type='text'
            placeholder={contact.placeholder}
            label={contact.label}
            id={contact.id}
          />
        </div>
      )
    })

    return (

      <div className={styles.formWrapper}>

        <form onSubmit={props.handleSubmit}>

          <div className={styles.mainRow}>

            <div className={styles.about}>
              <h3 className={styles.about__title}>Profile settings</h3>

              <Field
                name='fullName'
                type='text'
                component={profileInput}
                placeholder='Full Name'
                validate={[required]}
                label='Full Name'
                id='profileForm-fullName'
                requiredField={true}
              />

              <Field
                name='aboutMe'
                type='text'
                component={profileTextarea}
                placeholder='About me'
                validate={[required]}
                label='About me'
                id='profileForm-aboutMe'
                requiredField={true}
              />

              <Field
                name='lookingForAJob'
                type='checkbox'
                component={profileCheckbox}
                label='Looking for a job'
                id='profileForm-lookingForAJob'
              />

              <Field
                name={'lookingForAJobDescription'}
                type='text'
                component={profileTextarea}
                placeholder={'Job description'}
                validate={[]}
                label='Job description'
                id='profileForm-jobDescription'
                requiredField={false}
              />

            </div>

            <div className={styles.contacts}>
              <h3 className={styles.contacts__title}>Contacts</h3>
              {ContactsInputsGroup}
            </div>

          </div>


          <div className={styles.bottomRow}>

            {props.error &&
              <div className={styles.profileForm__errorOnSubmit}>
                {props.error}
              </div>
            }

            <div className={styles.profileForm__button}>
              <LoginButton isDisabled={props.submitting} isFetching={props.isFetching} text="Save" />
            </div>

          </div>

        </form>

      </div>

    )
  }

const ProfileReduxForm = reduxForm<ProfileFormValuesType, ProfileFormOwnPropsType>({ form: 'profile' })(ProfileForm)

export default ProfileReduxForm
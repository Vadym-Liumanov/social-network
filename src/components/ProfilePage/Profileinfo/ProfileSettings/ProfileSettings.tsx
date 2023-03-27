import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import { ProfileType } from '../../../../types/types'
import ProfileReduxForm from './ProfileForm/ProfileForm'
import PrimaryButton from '../../../common/Battons/PrimaryButton/PrimaryButton'

import styles from './ProfileSettings.module.css'
import FollowButton from '../../../common/Battons/FollowButton/FollowButton'

type PropsType = {
  profileDetails: ProfileType
  isOwner: boolean
  userId: number | null
  updateProfile: (profileData: ProfileType) => Promise<any>
  isFetching: boolean
}

const ProfileSettings: React.FC<PropsType> = ({ profileDetails, isOwner, userId, updateProfile, isFetching }) => {
  const [editMode, setEditMode] = useState(false)

  const onEnableEditMode = () => {
    setEditMode(true)
  }
  const onDisableEditMode = () => {
    setEditMode(false)
  }

  // todo remove then later
  const onSubmitProfileReduxForm = (profileData: ProfileType) => {
    updateProfile(profileData)
      .then(() => { setEditMode(false) })
  }

  const ProfileMainDetails = {
    fullName: 'Full Name:',
    aboutMe: 'About:',
    lookingForAJob: 'Looking for a job:',
    lookingForAJobDescription: 'Job description:'
  }

  type ProfileMainDetailsType = typeof ProfileMainDetails

  const ProfileMainDetailsList = Object.keys(ProfileMainDetails).map((item, index) => {
    return (
      <div key={index} className={styles.profileDetails__item}>

        <div className={styles.profileDetails__itemTitle}>
          {ProfileMainDetails[item as keyof ProfileMainDetailsType]}
        </div>

        {(typeof profileDetails[item as keyof ProfileMainDetailsType] !== 'boolean')
          ? <div className={styles.profileDetails__itemValue}>
            {profileDetails[item as keyof ProfileMainDetailsType] || '----------'}
          </div>
          : <div className={styles.profileDetails__itemValue}>
            {profileDetails[item as keyof ProfileMainDetailsType] ? 'Yes' : 'No'}
          </div>}
      </div>
    )
  })

  const ProfileContacts = {
    github: 'Github:',
    vk: 'VK:',
    facebook: 'Facebook:',
    instagram: 'Instagram:',
    twitter: 'Twitter:',
    youtube: 'Youtube:',
    website: 'Website:',
    mainLink: 'Main link:'
  }

  type ProfileContactsType = typeof ProfileContacts

  const ProfileContactsList = Object.keys(ProfileContacts).map((item, index) => {
    return (
      <div key={index} className={styles.profileDetails__item}>

        <div className={styles.profileDetails__itemTitle}>
          {ProfileContacts[item as keyof ProfileContactsType]}
        </div>

        <div className={styles.profileDetails__itemValue}>
          {profileDetails.contacts[item as keyof ProfileContactsType] || '----------'}
        </div>
      </div>
    )
  })

  return (
    <div className={styles.profileSettings}>

      {!editMode && (
        <div className={styles.profileSettings__wrapper}>

          <section className={styles.about}>
            <h3 className={styles.about__title}>Profile settings</h3>
            {ProfileMainDetailsList}
          </section>

          <section className={styles.contacts}>
            <h3 className={styles.contacts__title}>Contacts</h3>
            {ProfileContactsList}
          </section>

          <div className={styles.editButton}>
            {isOwner && <PrimaryButton
              text='Edit'
              onClick={onEnableEditMode}
            />}
            {!isOwner && <FollowButton
              userId={userId}
            />}
          </div>

        </div>
      )}


      {editMode && ReactDOM.createPortal(
        (
          <div className={styles.editProfileDetails}>

            <div className={styles.editProfileDetails__body}>

              <div className={styles.editProfileDetails__header}>
                <button onClick={onDisableEditMode}>
                  <div className={styles.cross}></div>
                </button>
              </div>

              <ProfileReduxForm
                onSubmit={onSubmitProfileReduxForm}
                initialValues={profileDetails}
                profileDetails={profileDetails}
                isFetching={isFetching}
              />

            </div>

          </div>
        ),
        document.getElementById('root') as Element | DocumentFragment
      )

      }

    </div>
  )
}

export default React.memo(ProfileSettings)

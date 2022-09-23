import React, { useState } from 'react'
import { ContactsType, ProfileType } from '../../../../types/types'
import ProfileReduxForm from './ProfileForm/ProfileForm'

import styles from './ProfileSettings.module.css'

type PropsType = {
  profileDetails: ProfileType
  isOwner: boolean
  updateProfile: (profileData: ProfileType) => Promise<any>
}

const ProfileSettings: React.FC<PropsType> = ({ profileDetails, isOwner, updateProfile }) => {
  const [editMode, setEditMode] = useState(false)

  const onEnableEditMode = () => {
    setEditMode(true)
  }
  const onDisableEditMode = () => {
    setEditMode(false)
  }

  // todo remove then latter
  const onSubmitProfileReduxForm = (profileData: ProfileType) => {
    updateProfile(profileData)
      .then(() => { setEditMode(false) })
  }

  return (
    <div>
      <div style={{ 'marginBottom': '10px' }}><b>ProfileSettings</b></div>

      {!editMode && (
        <div>
          <div className={styles.settingsItem}>
            <div><b>fullName: </b></div>
            <div>{profileDetails.fullName || '----------'}</div>
          </div>
          <div className={styles.settingsItem}>
            <div><b>aboutMe: </b></div>
            <div>{profileDetails.aboutMe || '----------'}</div>
          </div>
          <div className={styles.settingsItem}>
            <div><b>lookingForAJob: </b></div>
            <div>{profileDetails.lookingForAJob ? 'yes' : 'no'}</div>
          </div>
          <div className={styles.settingsItem}>
            <div><b>lookingForAJobDescription: </b></div>
            <div>{profileDetails.lookingForAJobDescription || '----------'}</div>
          </div>
          <div className={styles.contacts}>
            <div><b>Contacts</b></div>
            <div>
              {Object.keys(profileDetails.contacts).map((contact) => {
                return (
                  <div key={contact}>
                    <span><b>{contact}</b></span>
                    <span>{profileDetails.contacts[contact as keyof ContactsType] || ' -----'}</span>
                  </div>
                )
              })}

            </div>
          </div>
          {isOwner && <button onClick={onEnableEditMode}>Edit</button>}
        </div>
      )}

      {editMode && (
        <div>
          <ProfileReduxForm onSubmit={onSubmitProfileReduxForm} initialValues={profileDetails} profileDetails={profileDetails} />
          <button onClick={onDisableEditMode}>Back</button>
        </div>
      )}

    </div>
  )
}

export default ProfileSettings

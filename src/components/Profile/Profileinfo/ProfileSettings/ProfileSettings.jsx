import React, { useState } from 'react'
import ProfileReduxForm from './ProfileForm/ProfileForm'

import styles from './ProfileSettings.module.css'

const ProfileSettings = (props) => {

  const [editMode, setEditMode] = useState(false)

  const onEnableEditMode = () => {
    setEditMode(true)
  }
  const onDisableEditMode = () => {
    setEditMode(false)
  }

  const onSubmitProfileReduxForm = (profileData) => {
    // console.log(profileData)
    setEditMode(false)
    props.updateProfile(profileData)
  }

  return (
    <div>
      <div style={{ 'marginBottom': '10px' }}><b>ProfileSettings</b></div>

      {!editMode && (
        <div>
          <div className={styles.settingsItem}>
            <div><b>fullName: </b></div>
            <div>{props.fullName || '----------'}</div>
          </div>
          <div className={styles.settingsItem}>
            <div><b>aboutMe: </b></div>
            <div>{props.aboutMe || '----------'}</div>
          </div>
          <div className={styles.settingsItem}>
            <div><b>lookingForAJob: </b></div>
            <div>{props.lookingForAJob || '----------'}</div>
          </div>
          <div className={styles.settingsItem}>
            <div><b>lookingForAJobDescription: </b></div>
            <div>{props.lookingForAJobDescription || '----------'}</div>
          </div>
          <button onClick={onEnableEditMode}>Edit</button>
        </div>
      )}

      {editMode && (
        <div>
          <div>Form</div>
          <ProfileReduxForm onSubmit={onSubmitProfileReduxForm} />
          <button onClick={onDisableEditMode}>Back</button>
        </div>
      )}

    </div>
  )
}



export default ProfileSettings
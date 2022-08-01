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
    props.updateProfile(profileData)
    setEditMode(false)
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
            <div>{props.lookingForAJob ? 'yes' : 'no'}</div>
          </div>
          <div className={styles.settingsItem}>
            <div><b>lookingForAJobDescription: </b></div>
            <div>{props.lookingForAJobDescription || '----------'}</div>
          </div>
          <div className={styles.contacts}>
            <div><b>Contacts</b></div>
            <div>
              {Object.keys(props.contacts).map((contact) => {
                return (
                  <div key={contact}>
                    <span><b>{contact}</b></span>
                    <span>{props.contacts[contact] || ' -----'}</span>
                  </div>
                )
              })}

            </div>
          </div>
          <button onClick={onEnableEditMode}>Edit</button>
        </div>
      )}

      {editMode && (
        <div>
          <div>Form</div>
          <ProfileReduxForm onSubmit={onSubmitProfileReduxForm} initialValues={props} profileDetails={props} />
          <button onClick={onDisableEditMode}>Back</button>
        </div>
      )}

    </div>
  )
}



export default ProfileSettings

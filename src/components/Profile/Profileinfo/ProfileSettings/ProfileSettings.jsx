import React from 'react'

import styles from './ProfileSettings.module.css'

const ProfileSettings = (props) => {
  return (
    <div>
      <div style={{'margin-bottom': '10px'}}><b>ProfileSettings</b></div>
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
    </div>
  )
}



export default ProfileSettings
import React from "react";
import styles from './Aboutme.module.css'

const Aboutme: React.FC<any> = ({ aboutMe, contacts, lookingForAJob, lookingForAJobDescription }) => {
  // const Aboutme = (props) => {
  debugger
  const notSpecified = 'Not specified'

  return (
    <div>
      <div className={styles.aboutMe__title}>About me</div>
      <div>
        {aboutMe || notSpecified}
      </div>
      <div>
        {/* { contacts || notSpecified} */}
      </div>
      <div>
        lookingForAJob: {lookingForAJob || notSpecified}
      </div>
      <div>
        lookingForAJobDescription:{lookingForAJobDescription || notSpecified}
      </div>
    </div>
  )
}

export default Aboutme
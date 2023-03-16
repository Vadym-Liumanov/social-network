import React from 'react'

import styles from './Preloader.module.css'

import preloader from './../../../assets/preloaders/spinning-circles.svg'

const Preloader: React.FC = () => {
  return (
    <div className={styles.appPreloader}>
      <img src={preloader} alt='preloader' />
    </div>
  )
}

export default Preloader
import React from 'react'

import './preloader.css'

import preloader from './../../../assets/preloaders/spinning-circles.svg'

const Preloader: React.FC = () => {
  return (
    <div className="initial-app-preloader">
      <img src={preloader} alt='preloader' />
    </div>
  )
}

export default Preloader
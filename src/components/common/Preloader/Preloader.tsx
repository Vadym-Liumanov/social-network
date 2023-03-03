import React from 'react'

import preloader from '../../../assets/images/preloaders/'

const Preloader: React.FC = () => {
  return (
    <div className="">
      <img src={preloader} alt='preloader' style={{ width: 100, height: 100 }} />
    </div>
  )
}

export default Preloader
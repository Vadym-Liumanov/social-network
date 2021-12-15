import React from 'react'

import userImage from '../../../assets/images/userImage.jpg'

const DefaultUserPhoto = () => {
  return (
    <div style={{ "width": "100px", "height": "100px" }}>
      <img src={userImage} alt="userImage by default" />
    </div>
  );
}

export default DefaultUserPhoto

import React from 'react'

import likesStyles from './Likes.module.css'

const Likes = (props) => {
  return (
    <div className={likesStyles.item}>
      <div>
        LIKES: {props.likesCount}
      </div>
    </div>
  );
}

export default Likes

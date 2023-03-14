import React from 'react'

import likesStyles from './Likes.module.css'

type PropsType = {
  likesCount: number
}

const Likes: React.FC<PropsType> = ({ likesCount }) => {
  return (
    <div className={likesStyles.item}>
      <div>
        LIKES: {likesCount}
      </div>
    </div>
  )
}

export default Likes

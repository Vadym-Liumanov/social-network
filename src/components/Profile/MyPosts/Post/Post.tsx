import React from 'react'

import PostStyles from './Post.module.css'

import Likes from './Likes/Likes'

type PropsType = {
  value: string
  likesCount: number
}

const Post: React.FC<PropsType> = ({ value, likesCount }) => {
  return (
    <div className={PostStyles.item}>
      <div>
        {value}
      </div>
      <div>
        <Likes likesCount={likesCount} />
      </div>
    </div>

  )
}

export default Post

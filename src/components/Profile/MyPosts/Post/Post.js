import React from 'react'

import PostStyles from'./Post.module.css'

import Likes from './Likes/Likes'

const Post = (props) => {
  return (
    <div className={PostStyles.item}>
      <div>
        {props.value}
      </div>
      <div>
        <Likes likesCount={props.likesCount}/>
      </div>
    </div>

  );
}

export default Post

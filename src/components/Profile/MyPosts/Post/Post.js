import React from 'react'

import PostStyles from'./Post.module.css'

const Post = (props) => {
  return (
    <div className={PostStyles.item}>
      {props.value}
    </div>
  );
}

export default Post

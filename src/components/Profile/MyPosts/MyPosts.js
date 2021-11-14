import React from 'react'

import myPostsStyles from'./MyPosts.module.css'
import Post from './Post/Post';

const MyPosts = () => {
  return (
    <div className={myPostsStyles.content}>
      <div>
        My posts
      </div>
      <div>
        New post
      </div>
      <div>
        Posts
      </div>
      <Post value="post1"/>
      <Post value="post2"/>
      <Post value="post3"/>
      <Post value="post4"/>
    </div>
  );
}

export default MyPosts

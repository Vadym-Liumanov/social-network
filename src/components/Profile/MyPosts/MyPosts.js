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
        <textarea name="" id="" cols="100" rows="10"></textarea>
        <button>Send post</button>
      </div>
      <div>
        Posts
      </div>
      <Post value="It is my first post!" likesCount="20"/>
      <Post value="How are you?" likesCount="10"/>
      <Post value="Hello World!" likesCount="5"/>
      <Post value="Why nobody loves me?" likesCount="12"/>
    </div>
  );
}

export default MyPosts

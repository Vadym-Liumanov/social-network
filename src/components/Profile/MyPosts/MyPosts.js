import React from 'react'

import myPostsStyles from'./MyPosts.module.css'
import Post from './Post/Post'

import profilePostsData from '../../../Data/profilePosts'

const postData = profilePostsData

const MyPosts = () => {
  return (
    <div className={myPostsStyles.content}>
      <div>
        <h3>My posts</h3>
      </div>
      <div>
        New post
      </div>
      <div>
        <div>
          <textarea name="" id="" cols="100" rows="10"></textarea>
        </div>
        <div>
          <button>Add post</button>
        </div>
      </div>
      <div>
        Posts
      </div>
      <div>
        <Post value={postData[0].post} likesCount={postData[0].likesCount} />
        <Post value={postData[1].post} likesCount={postData[1].likesCount} />
        <Post value={postData[2].post} likesCount={postData[2].likesCount} />
        <Post value={postData[3].post} likesCount={postData[3].likesCount} />
      </div>
    </div>
  );
}

export default MyPosts

import React from 'react'

import myPostsStyles from './MyPosts.module.css'
import Post from './Post/Post'

import profilePostsData from '../../../Data/profilePosts'

let postElements = profilePostsData.map(post => <Post key={post.id} value={post.post} likesCount={post.likesCount} />)

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
        {postElements}
      </div>
    </div>
  );
}

export default MyPosts

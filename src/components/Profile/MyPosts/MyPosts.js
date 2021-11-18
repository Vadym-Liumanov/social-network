import React from 'react'

import myPostsStyles from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = (props) => {
// debugger
  let postElements = Object.values(props.state.profilePosts).map(post => <Post key={post.id} value={post.post} likesCount={post.likesCount} />)

  let newPostText = props.state.newPost

  let addPost = props.addPost

  let updatePost = props.updatePost

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
          <textarea onChange={updatePost} cols="100" rows="3" value={newPostText} />
        </div>
        <div>
          <button onClick={addPost}>Add post</button>
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

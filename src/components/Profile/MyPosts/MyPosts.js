import React from 'react'

import myPostsStyles from './MyPosts.module.css'
import Post from './Post/Post'

import { addPostActionCreator, updatePostActionCreator } from '../../../redux/state'

const MyPosts = (props) => {
// debugger
  let postElements = Object.values(props.state.profilePosts).map(post => <Post key={post.id} value={post.post} likesCount={post.likesCount} />)

  let newPostText = props.state.newPost

  let addPost = () => {
    // debugger
    props.dispatch(addPostActionCreator())
  }

  let updatePost = (event) => {
    let text = event.target.value
    props.dispatch(updatePostActionCreator(text))
  }


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
          <textarea onChange={updatePost} value={newPostText} placeholder="Input your post here" />
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

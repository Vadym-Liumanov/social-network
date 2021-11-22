import React from 'react'

import myPostsStyles from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = (props) => {
// debugger
  let postElements = Object.values(props.state.profilePosts).map(post => <Post key={post.id} value={post.post} likesCount={post.likesCount} />)

  let newPostElement = React.createRef()

  let newPostText = props.state.newPost

  let addPost = () => {
    // debugger
    props.dispatch({ type: 'ADD-POST' })
  }

  let updatePost = () => {
    let text = newPostElement.current.value
    props.dispatch({ type: 'ADD-DIALOG', text: text })
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
          <textarea onChange={updatePost} ref={newPostElement} cols="100" rows="3" value={newPostText} />
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

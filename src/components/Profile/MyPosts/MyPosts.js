import React from 'react'

import myPostsStyles from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = (props) => {

  let postElements = Object.values(props.state).map(post => <Post key={post.id} value={post.post} likesCount={post.likesCount} />)

  let newPostElement = React.createRef()

  let addPost = () => {
    let text = newPostElement.current.value
    props.addPost(text)
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
          <textarea ref={newPostElement} cols="100" rows="3" ></textarea>
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

import React from 'react'
import { Field, reduxForm } from 'redux-form'

import myPostsStyles from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = (props) => {
  // debugger
  let postElements = Object.values(props.profilePosts).map(post => <Post key={post.id} value={post.post} likesCount={post.likesCount} />)

  const onSubmitReduxForm = (formData) => {
    // console.log(formData)
    props.addPost(formData.postText)
  }

  const MyPostForm = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field component={'textarea'} name={'postText'} placeholder={'Input your post here'} />
        </div>
        <div>
          <button>Add post</button>
        </div>
      </form>
    )
  }

  const MyPostReduxForm = reduxForm({ form: 'profileMyPost' })(MyPostForm)

  return (
    <div className={myPostsStyles.content}>
      <div>
        <h3>My posts</h3>
      </div>
      <div>
        New post
      </div>
      <MyPostReduxForm onSubmit={onSubmitReduxForm} />
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

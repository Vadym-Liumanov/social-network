import React from 'react'
import { Field, reduxForm } from 'redux-form'

import myPostsStyles from './MyPosts.module.css'
import Post from './Post/Post'
import { required, maxLength } from '../../../utils/validators/validators'
import { Element } from '../../common/FormsControls/FormsControls'

const MyPosts = (props) => {
  // debugger

  // console.log('COMPONENT WAS RENDERED')

  let postElements = Object.values(props.profilePosts).map(post => <Post key={post.id} value={post.post} likesCount={post.likesCount} />)

  const onSubmitReduxForm = (formData) => {
    // console.log(formData)
    props.addPost(formData.postText)
  }

  const maxLength5 = maxLength(5)

  const MyPostForm = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field component={Element} name={'postText'} placeholder={'Input your post here'} validate={[required, maxLength5]} elementType='textarea' />
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

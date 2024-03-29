import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import myPostsStyles from './MyPosts.module.css'
import Post from './Post/Post'
import MyPostReduxForm, { PostFormValuesType } from './MyPostForm/MyPostForm'

import { ProfilePostType } from '../../../redux/profile-reducer'
import { getProfilePosts } from '../../../redux/profile-selectors'
import { actionCreators } from '../../../redux/profile-reducer'

const MyPosts: React.FC = () => {
  const profilePosts: Array<ProfilePostType> = useSelector(getProfilePosts)
  const dispatch = useDispatch()
  const addPost = (text: string) => dispatch(actionCreators.addPost(text))

  const onSubmitReduxForm = (formData: PostFormValuesType) => {
    addPost(formData.postText)
  }

  let postElements = Object.values(profilePosts)
    .reverse()
    .map(post => <Post key={post.id} value={post.post} likesCount={post.likesCount} />)

  return (
    <div className={myPostsStyles.content}>
      <div><h3>My posts</h3></div>
      <div>New post</div>
      <MyPostReduxForm onSubmit={onSubmitReduxForm} />
      <div>Posts</div>
      <div>{postElements}</div>
    </div>
  )
}

export default React.memo(MyPosts)

import React from 'react'

import MyPosts from './MyPosts'

import { addPostActionCreator, updatePostActionCreator } from '../../../redux/profile-reducer'

const MyPostsContainer = (props) => {

  let profilePosts = props.store.getState().profile.profilePosts

  let newPostText = props.store.getState().profile.newPost

  let addPost = () => {
    props.store.dispatch(addPostActionCreator())
  }

  let updatePost = (text) => {
    props.store.dispatch(updatePostActionCreator(text))
  }

  return (
    <MyPosts profilePosts={profilePosts} newPostText={newPostText} addPost={addPost} updatePost={updatePost} />
  )
}

export default MyPostsContainer

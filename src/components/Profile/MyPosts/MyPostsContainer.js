import React from 'react'

import MyPosts from './MyPosts'
import StoreContext from '../../../StoreContext'
import { addPostActionCreator, updatePostActionCreator } from '../../../redux/profile-reducer'

const MyPostsContainer = (props) => {



  return (
    <StoreContext.Consumer>
      {(store) => {
        let profilePosts = store.getState().profile.profilePosts

        let newPostText = store.getState().profile.newPost

        let addPost = () => {
          store.dispatch(addPostActionCreator())
        }

        let updatePost = (text) => {
          store.dispatch(updatePostActionCreator(text))
        }

        return (
          <MyPosts profilePosts={profilePosts} newPostText={newPostText} addPost={addPost} updatePost={updatePost} />
        )
      }
      }
    </StoreContext.Consumer>
  )
}

export default MyPostsContainer

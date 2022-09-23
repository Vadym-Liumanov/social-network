import {compose} from 'redux'
import MyPosts from './MyPosts'
import { actionCreators } from '../../../redux/profile-reducer'
import { connect } from 'react-redux'
import { AppStateType } from '../../../redux/store-redux'
import { ProfilePostType } from '../../../redux/profile-reducer'
import React from 'react'

const mapStateToProps = (state: AppStateType) => {
  return {
    profilePosts: state.profile.profilePosts
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addPost: (text: string) => dispatch(actionCreators.addPost(text)),
  }
}

type MapStatePropsType = {
  profilePosts: Array<ProfilePostType>
}
type MapDispatchPropsType = {
  addPost: (text: string) => void
}

const MyPostsContainer = compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(mapStateToProps, mapDispatchToProps)
)(MyPosts)



export default MyPostsContainer

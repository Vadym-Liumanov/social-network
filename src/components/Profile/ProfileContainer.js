import React from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'

import { setUserProfileThunk } from '../../redux/profile-reducer'

import profileStyles from './Profile.module.css'

import MainImg from './MainImg/MainImg'
import UserInfo from './UserInfo/UserInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import Preloader from '../common/Preloader/Preloader'

class ProfileApiReqContainer extends React.Component {

  componentDidMount() {
    // debugger
    const userId = this.props.match.params.userId
    this.props.setUserProfileThunk(userId)
  }

  render() {
    if (!this.props.isAuth) {
      return (
        <Redirect to='/login'/>
      )
    }

    return (
      <div className={profileStyles.content}>
        <MainImg />
        {this.props.profileInfo ? <UserInfo {...this.props.profileInfo} /> : <Preloader />}
        <MyPostsContainer />
      </div>
    )
  }
}

const MapStateToProps = (state) => {
  return {
    profileInfo: state.profile.userProfile,
    isAuth: state.auth.isAuth
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    setUserProfileThunk: (id) => dispatch(setUserProfileThunk(id))
  }
}

const WithUrlDataContainer = withRouter(ProfileApiReqContainer)

const ProfileContainer = connect(MapStateToProps, MapDispatchToProps)(WithUrlDataContainer)

// const ProfileContainer = connect(MapStateToProps, MapDispatchToProps)(ProfileApiReqContainer)

export default ProfileContainer

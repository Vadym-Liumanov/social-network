import React from 'react'
import { connect } from 'react-redux'
import * as axios from 'axios'

import { setUserProfileAC } from '../../redux/profile-reducer'

import profileStyles from './Profile.module.css'

import MainImg from './MainImg/MainImg'
import UserInfo from './UserInfo/UserInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'

class ProfileApiReqContainer extends React.Component {

  getApiData = (url) => {
    axios.get(url).then((response) => {
      this.props.setUserProfile(response.data)
    })
  }

  componentDidMount() {
    let apiUrl = 'https://social-network.samuraijs.com/api/1.0/profile/2'
    this.getApiData(apiUrl)
  }

  render() {
    return (
      <div className={profileStyles.content}>
        <MainImg />
        <UserInfo {...this.props.profileInfo} />
        <MyPostsContainer />
      </div>
    )
  }
}

const MapStateToProps = (state) => {
  return {
    profileInfo: state.profile.userProfile
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    setUserProfile: (profile) => dispatch(setUserProfileAC(profile))
  }
}

const ProfileContainer = connect(MapStateToProps, MapDispatchToProps)(ProfileApiReqContainer)

export default ProfileContainer

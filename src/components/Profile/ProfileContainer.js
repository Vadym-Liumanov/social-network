import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as axios from 'axios'

import { setUserProfileAC } from '../../redux/profile-reducer'

import profileStyles from './Profile.module.css'

import MainImg from './MainImg/MainImg'
import UserInfo from './UserInfo/UserInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import Preloader from '../common/Preloader/Preloader'

class ProfileApiReqContainer extends React.Component {

  getApiData = (url) => {
    axios.get(url).then((response) => {
      this.props.setUserProfile(response.data)
    })
  }

  componentDidMount() {
    // debugger
    const userId = this.props.match.params.userId
    let apiUrl = 'https://social-network.samuraijs.com/api/1.0/profile/' + userId
    this.getApiData(apiUrl)
  }

  render() {
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
    profileInfo: state.profile.userProfile
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    setUserProfile: (profile) => dispatch(setUserProfileAC(profile))
  }
}

const WithUrlDataContainer = withRouter(ProfileApiReqContainer)

const ProfileContainer = connect(MapStateToProps, MapDispatchToProps)(WithUrlDataContainer)

// const ProfileContainer = connect(MapStateToProps, MapDispatchToProps)(ProfileApiReqContainer)

export default ProfileContainer

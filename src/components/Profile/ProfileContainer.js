import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setUserProfileThunk } from '../../redux/profile-reducer'

import { withAuthRedirect } from '../../hoc/withAuthRedirect'

import profileStyles from './Profile.module.css'

import MainImg from './MainImg/MainImg'
import UserInfo from './UserInfo/UserInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import Preloader from '../common/Preloader/Preloader'

class ProfileApiReqContainer extends React.Component {

  componentDidMount() {
    // debugger
    const userId = this.props.match.params.userId
    if (!userId) { this.props.setUserProfileThunk(this.props.myId) } else { this.props.setUserProfileThunk(userId) }
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
    profileInfo: state.profile.userProfile,
    myId: state.auth.id
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    setUserProfileThunk: (id) => dispatch(setUserProfileThunk(id))
  }
}

const withAuthRedirectContainer = withAuthRedirect(ProfileApiReqContainer)

const WithUrlDataContainer = withRouter(withAuthRedirectContainer)

const ProfileContainer = connect(MapStateToProps, MapDispatchToProps)(WithUrlDataContainer)

// const ProfileContainer = connect(MapStateToProps, MapDispatchToProps)(ProfileApiReqContainer)

export default ProfileContainer

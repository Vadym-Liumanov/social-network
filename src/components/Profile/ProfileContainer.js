import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import { setUserProfileThunk, setUserStatusThunk, setMyStatusThunk, updateMyStatusThunk } from '../../redux/profile-reducer'

import { withAuthRedirect } from '../../hoc/withAuthRedirect'

import profileStyles from './Profile.module.css'

import MainImg from './MainImg/MainImg'
import UserInfo from './UserInfo/UserInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import Preloader from '../common/Preloader/Preloader'
import ProfileStatus from './Profileinfo/ProfileStatus'

class ProfileContainer extends React.Component {

  componentDidMount() {
    // debugger
    const paramsUserId = this.props.match.params.userId
    // const userId = (paramsUserId) ? paramsUserId : this.props.myId

    this.props.setUserProfileThunk(paramsUserId)
    this.props.setUserStatusThunk(paramsUserId)
    this.props.setMyStatusThunk(this.props.myId)
  }

  render() {

    return (
      <div className={profileStyles.content}>
        <div>
          <span>My status is:</span>
          <ProfileStatus status={this.props.myStatus} updateMyStatus={this.props.updateMyStatusThunk} />
        </div>
        <MainImg />
        {this.props.profileInfo ? <UserInfo
          {...this.props.profileInfo}
          userStatus={this.props.userStatus} />
          : <Preloader />}
        <MyPostsContainer />
      </div>
    )
  }
}

const MapStateToProps = (state) => {
  return {
    profileInfo: state.profile.userProfile,
    userStatus: state.profile.userStatus,
    myStatus: state.profile.myStatus,
    myId: state.auth.id,
    isAuth: state.auth.isAuth
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    setUserProfileThunk: (id) => dispatch(setUserProfileThunk(id)),
    setUserStatusThunk: (id) => dispatch(setUserStatusThunk(id)),
    setMyStatusThunk: (myId) => dispatch(setMyStatusThunk(myId)),
    updateMyStatusThunk: (myStatus) => dispatch(updateMyStatusThunk(myStatus))
  }
}

export default compose(
  connect(MapStateToProps, MapDispatchToProps),
  withRouter,
  withAuthRedirect
)(ProfileContainer)

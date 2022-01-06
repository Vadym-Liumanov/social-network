import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import { setUserProfileThunk } from '../../redux/profile-reducer'

import { withAuthRedirect } from '../../hoc/withAuthRedirect'

import profileStyles from './Profile.module.css'

import MainImg from './MainImg/MainImg'
import UserInfo from './UserInfo/UserInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import Preloader from '../common/Preloader/Preloader'

class ProfileContainer extends React.Component {

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

export default compose(
  connect(MapStateToProps, MapDispatchToProps),
  withRouter,
  withAuthRedirect
)(ProfileContainer)

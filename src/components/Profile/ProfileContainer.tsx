import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { compose } from 'redux'

import {
  setUserProfileThunk, setUserStatusThunk, setMyStatusThunk,
  updateMyStatusThunk, savePhotoThunk, updateProfileThunk
} from '../../redux/profile-reducer'

import { withAuthRedirect } from '../../hoc/withAuthRedirect'

import profileStyles from './Profile.module.css'

import ProfileInfo from './Profileinfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import Preloader from '../common/Preloader/Preloader'
import { AppStateType } from '../../redux/store-redux'
import { ProfileType } from '../../types/types'
// import ProfileStatus from './Profileinfo/ProfileStatus'

type PropsType = MapStatePropsType & MapDispatchPropsType & WithRouterProps

type MapStatePropsType = ReturnType<typeof MapStateToProps>
type MapDispatchPropsType = ReturnType<typeof MapDispatchToProps>
type PathParamsType = {
  userId: string
}
type WithRouterProps = RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {

  componentDidMount() {
    const paramsUserId = this.props.match.params.userId
    const userId = (paramsUserId) ? paramsUserId : this.props.myId

    this.props.setUserProfileThunk(userId as number)
    this.props.setUserStatusThunk(userId as number)
    this.props.setMyStatusThunk(this.props.myId as number)
  }

  render() {
    let isOwner = false
    if (!this.props.match.params.userId && this.props.myId) { isOwner = true }
    if (+this.props.match.params.userId === this.props.myId) { isOwner = true }

    // const isOwner = (!this.props.match.params.userId && this.props.myId) || (+this.props.match.params.userId === this.props.myId)

    return (
      <div className={profileStyles.content}>
        {/* <div>
          <span>My status is:</span>
          <ProfileStatus status={this.props.myStatus} updateMyStatus={this.props.updateMyStatusThunk} />
        </div> */}
        {this.props.profileInfo ? <ProfileInfo
          isOwner={isOwner}
          profileDetails={this.props.profileInfo}
          userStatus={this.props.userStatus}
          myStatus={this.props.myStatus}
          updateMyStatus={this.props.updateMyStatusThunk}
          savePhoto={this.props.savePhotoThunk}
          updateProfile={this.props.updateProfile} />
          : <Preloader />}
        {isOwner && <MyPostsContainer />}
      </div>
    )
  }
}

// type MapStatePropsType = {
//   profileInfo: ProfileType
//   userStatus: Nullable<string>
//   myStatus: Nullable<string>
//   myId: number
//   isAuth: boolean
// }

const MapStateToProps = (state: AppStateType) => {
  return {
    profileInfo: state.profile.userProfile,
    userStatus: state.profile.userStatus,
    myStatus: state.profile.myStatus,
    myId: state.auth.id,
    isAuth: state.auth.isAuth
  }
}

// type MapDispatchPropsType = {
//   setUserProfileThunk: (id: number) => void
//   setUserStatusThunk: (id: number) => void
//   setMyStatusThunk: (myId: number) => void
//   updateMyStatusThunk: (myStatus: string) => void
//   savePhotoThunk: (fileData: any) => void
//   updateProfile: (profileData: ProfileType) => void
// }

const MapDispatchToProps = (dispatch: any) => {
  return {
    setUserProfileThunk: (id: number) => dispatch(setUserProfileThunk(id)),
    setUserStatusThunk: (id: number) => dispatch(setUserStatusThunk(id)),
    setMyStatusThunk: (myId: number) => dispatch(setMyStatusThunk(myId)),
    updateMyStatusThunk: (myStatus: string) => dispatch(updateMyStatusThunk(myStatus)),
    savePhotoThunk: (fileData: File) => dispatch(savePhotoThunk(fileData)),
    updateProfile: (profileData: ProfileType) => dispatch(updateProfileThunk(profileData))
  }
}

export default compose<React.ComponentType>(
  connect(MapStateToProps, MapDispatchToProps),
  withRouter,
  withAuthRedirect
)(ProfileContainer)

import MyPosts from './MyPosts'
import { addPostAC } from '../../../redux/profile-reducer'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    profilePosts: state.profile.profilePosts,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (text) => dispatch(addPostAC(text)),
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer

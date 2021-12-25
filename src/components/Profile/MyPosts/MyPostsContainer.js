import MyPosts from './MyPosts'
import { addPostAC, updatePostAC } from '../../../redux/profile-reducer'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    profilePosts: state.profile.profilePosts,
    newPostText: state.profile.newPost
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: () => dispatch(addPostAC()),
    updatePost: (text) => dispatch(updatePostAC(text))
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer

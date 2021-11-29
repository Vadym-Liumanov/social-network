import MyPosts from './MyPosts'
import { addPostActionCreator, updatePostActionCreator } from '../../../redux/profile-reducer'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    profilePosts: state.profile.profilePosts,
    newPostText: state.profile.newPost
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: () => dispatch(addPostActionCreator()),
    updatePost: (text) => dispatch(updatePostActionCreator(text))
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer

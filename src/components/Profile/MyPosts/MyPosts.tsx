import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import myPostsStyles from './MyPosts.module.css'
import Post from './Post/Post'
import { required, maxLength } from '../../../utils/validators/validators'
import { Element } from '../../common/FormsControls/FormsControls'
import { ProfilePostType } from '../../../redux/profile-reducer'
import { getProfilePosts } from '../../../redux/profile-selectors'
import { actionCreators } from '../../../redux/profile-reducer'

const MyPosts: React.FC = () => {
  const profilePosts: Array<ProfilePostType> = useSelector(getProfilePosts)
  const dispatch = useDispatch()
  const addPost = (text: string) => dispatch(actionCreators.addPost(text))

  const onSubmitReduxForm = (formData: PostFormValuesType) => {
    addPost(formData.postText)
  }

  let postElements = Object.values(profilePosts)
    .reverse()
    .map(post => <Post key={post.id} value={post.post} likesCount={post.likesCount} />)

  type PostFormValuesType = {
    postText: string
  }

  const maxLength5 = maxLength(5)

  // Пропсы, которые передаются в <MyPostForm /> в качестве инлайн атрибутов
  type PostFormOwnPropsType = {}

  const MyPostForm: React.FC<InjectedFormProps<PostFormValuesType, PostFormOwnPropsType> & PostFormOwnPropsType> = ({ handleSubmit }) => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field component={Element} name={'postText'} placeholder={'Input your post here'} validate={[required, maxLength5]} elementType='textarea' />
        </div>
        <div>
          <button>Add post</button>
        </div>
      </form>
    )
  }

  const MyPostReduxForm = reduxForm<PostFormValuesType, PostFormOwnPropsType>({ form: 'profileMyPost' })(MyPostForm)

  return (
    <div className={myPostsStyles.content}>
      <div><h3>My posts</h3></div>
      <div>New post</div>
      <MyPostReduxForm onSubmit={onSubmitReduxForm} />
      <div>Posts</div>
      <div>{postElements}</div>
    </div>
  )
}

export default React.memo(MyPosts)

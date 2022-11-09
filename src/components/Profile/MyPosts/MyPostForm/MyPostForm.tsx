import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { required, maxLength } from '../../../../utils/validators/validators'
import { Element } from '../../../common/FormsControls/FormsControls'

export type PostFormValuesType = {
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

export default React.memo(MyPostReduxForm)
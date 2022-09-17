import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'

import dialogsStyles from './Dialogs.module.css'

import User from './User/User'
import Dialog from './Dialog/Dialog'
import { required, maxLength } from '../../utils/validators/validators'
import { Element } from '../common/FormsControls/FormsControls'

type UserType = {
  id: number
  userName: string
}

type DialogType = {
  id: number
  dialog: string
}

type PropsType = {
  users: Array<UserType>
  dialogs: Array<DialogType>
  addNewDialog: (text: string) => void
}

const Dialogs: React.FC<PropsType> = ({ users, dialogs, addNewDialog }) => {

  let dialogsUsersItems = users.map(user => <User key={user.id} userName={user.userName} />)
  let dialogsContentItems = dialogs.map(dialog => <Dialog key={dialog.id} dialogContent={dialog.dialog} />)

  type LoginFormValuesType = {
    dialogText: string
  }

  const onSubmitReduxForm = (formData: LoginFormValuesType) => {
    // console.log(formData)
    addNewDialog(formData.dialogText)
  }

  const maxLength10 = maxLength(10)

  type LoginFormOwnPropsType = {
  }

  const DialogForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field component={Element} name={'dialogText'} placeholder={'Input your message here'} validate={[required, maxLength10]} elementType='textarea' />
        </div>
        <div>
          <button>Add message</button>
        </div>
      </form>
    )
  }

  const DialogReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({ form: 'dialogForm' })(DialogForm)

  return (
    <div className={dialogsStyles.content}>
      <div>
        <div>
          NickNames
        </div>
        <div>
          {dialogsUsersItems}
        </div>
      </div>
      <div>
        <div>
          DIALOGS
        </div>
        <div>
          {dialogsContentItems}
        </div>
        <DialogReduxForm onSubmit={onSubmitReduxForm} />
      </div>
    </div>
  )
}

export default Dialogs

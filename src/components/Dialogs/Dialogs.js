import React from 'react'
import { Field, reduxForm } from 'redux-form'

import dialogsStyles from './Dialogs.module.css'

import User from './User/User'
import Dialog from './Dialog/Dialog'
import { required, maxLength } from '../../utils/validators/validators'
import { Element } from '../common/FormsControls/FormsControls'

const Dialogs = (props) => {

  let dialogsUsersItems = Object.values(props.users).map(user => <User key={user.id} userName={user.userName} />)
  let dialogsContentItems = Object.values(props.dialogs).map(dialog => <Dialog key={dialog.id} dialogContent={dialog.dialog} />)

  const onSubmitReduxForm = (formData) => {
    // console.log(formData)
    props.addNewDialog(formData.dialogText)
  }

  const maxLength10 = maxLength(10)

  const DialogForm = (props) => {
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

  const DialogReduxForm = reduxForm({ form: 'dialogForm' })(DialogForm)

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
  );
}

export default Dialogs

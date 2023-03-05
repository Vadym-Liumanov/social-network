import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'

import dialogsStyles from './Dialogs.module.css'

import User from './User/User'
import Dialog from './Dialog/Dialog'
import { required, maxLength } from '../../utils/validators/validators'
import { textInput } from '../common/FormsControls/FormsControls'

import { getIsAuth } from '../../redux/auth-selectors'
import { getDialogs, getDialogsUsers } from '../../redux/messages-selectors'
import { actionCreators } from '../../redux/messages-reducer'

const Dialogs: React.FC = () => {
  const dispatch = useDispatch()
  const addNewDialog = (text: string) => dispatch(actionCreators.addNewDilogAC(text))

  const isAuth = useSelector(getIsAuth)
  const users = useSelector(getDialogsUsers)
  const dialogs = useSelector(getDialogs)

  const dialogsUsersItems = users.map(user => <User key={user.id} userName={user.userName} />)
  const dialogsContentItems = dialogs.map(dialog => <Dialog key={dialog.id} dialogContent={dialog.dialog} />)

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
        {/* <div>
          <Field component={Element} name={'dialogText'} placeholder={'Input your message here'} validate={[required, maxLength10]} elementType='textarea' />
        </div>
        <div>
          <button>Add message</button>
        </div> */}
      </form>
    )
  }

  const DialogReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({ form: 'dialogForm' })(DialogForm)

  return (
    <>
      {!isAuth
        ? <Redirect to='/login' />
        :
        <div className={dialogsStyles.content}>
          <div>
            <div>NickNames</div>
            <div>{dialogsUsersItems}</div>
          </div>
          <div>
            <div>DIALOGS</div>
            <div>{dialogsContentItems}</div>
            <DialogReduxForm onSubmit={onSubmitReduxForm} />
          </div>
        </div>
      }
    </>
  )
}

export default React.memo(Dialogs)

import { connect } from 'react-redux'

import Dialogs from './Dialogs'
import { addNewDilogActionCreator, updateNewDialogActionCreator } from '../../redux/messages-reducer'

const mapStateToProps = (state) => {
  return {
    users: state.messages.users,
    dialogs: state.messages.dialogs,
    newDialogText: state.messages.newDialog,
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewDialog: () => dispatch(addNewDilogActionCreator()),
    updateNewDialog: (text) => dispatch(updateNewDialogActionCreator(text))
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer
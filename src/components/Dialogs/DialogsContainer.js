import { connect } from 'react-redux'

import { withAuthRedirect } from '../../hoc/withAuthRedirect'

import Dialogs from './Dialogs'
import { addNewDilogActionCreator, updateNewDialogActionCreator } from '../../redux/messages-reducer'

const mapStateToProps = (state) => {
  return {
    users: state.messages.users,
    dialogs: state.messages.dialogs,
    newDialogText: state.messages.newDialog,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewDialog: () => dispatch(addNewDilogActionCreator()),
    updateNewDialog: (text) => dispatch(updateNewDialogActionCreator(text))
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect(Dialogs))

export default DialogsContainer
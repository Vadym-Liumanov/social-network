import { connect } from 'react-redux'
import { compose } from 'redux'

import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import Dialogs from './Dialogs'
import { addNewDilogAC } from '../../redux/messages-reducer'
import {AppStateType} from '../../redux/store-redux'

const mapStateToProps = (state: AppStateType) => {
  return {
    users: state.messages.users,
    dialogs: state.messages.dialogs,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addNewDialog: (text: string) => dispatch(addNewDilogAC(text))
  }
}

const DialogsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)

export default DialogsContainer
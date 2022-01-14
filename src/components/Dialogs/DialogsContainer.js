import { connect } from 'react-redux'
import { compose } from 'redux'

import { withAuthRedirect } from '../../hoc/withAuthRedirect'

import Dialogs from './Dialogs'
import { addNewDilogAC } from '../../redux/messages-reducer'

const mapStateToProps = (state) => {
  return {
    users: state.messages.users,
    dialogs: state.messages.dialogs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewDialog: (text) => dispatch(addNewDilogAC(text))
  }
}

const DialogsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)

export default DialogsContainer
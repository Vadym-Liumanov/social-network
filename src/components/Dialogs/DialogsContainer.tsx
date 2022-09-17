import { connect } from 'react-redux'
import { compose } from 'redux'

import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import Dialogs from './Dialogs'
import { actionCreators } from '../../redux/messages-reducer'
import { AppStateType } from '../../redux/store-redux'
import React from 'react'

const mapStateToProps = (state: AppStateType) => {
  return {
    users: state.messages.users,
    dialogs: state.messages.dialogs,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addNewDialog: (text: string) => dispatch(actionCreators.addNewDilogAC(text))
  }
}

const DialogsContainer = compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)

export default DialogsContainer
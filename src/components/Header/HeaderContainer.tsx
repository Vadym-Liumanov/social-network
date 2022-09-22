import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { logoutThunk } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/store-redux'
import { StateType } from '../../redux/auth-reducer'

import Header from './Header'

type MapStatePropsType = {
  authData: StateType
}
type MapDispatchPropsType = {
  logoutThunk: () => void
}

const mapStateToProps = (state: AppStateType) => {
  return {
    authData: state.auth
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    logoutThunk: () => dispatch(logoutThunk())
  }
}

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(mapStateToProps, mapDispatchToProps)
)(Header)

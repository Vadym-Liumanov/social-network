import React from 'react'
import { connect } from 'react-redux'

import { logoutThunk } from '../../redux/auth-reducer'

import Header from './Header'

class HeaderContainer extends React.Component {

  render() {
    return <Header {...this.props.authData} logoutThunk={this.props.logoutThunk} />
  }
}

const mapStateToProps = (state) => {
  return {
    authData: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutThunk: () => dispatch(logoutThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)

import React from 'react'

import Header from './Header'
import { getAuthDataThunk } from '../../redux/auth-reducer'
import { connect } from 'react-redux'

class HeaderContainer extends React.Component {

  componentDidMount() {
    this.props.getAuthDataThunk()
  }

  render() {
    return <Header {...this.props.authData} />
  }
}

const mapStateToProps = (state) => {
  return {
    authData: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAuthDataThunk: () => dispatch(getAuthDataThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)

import React from 'react'

import { getAuthData } from '../../api/api'
import Header from './Header'
import { setUserAuthDataAC } from '../../redux/auth-reducer'
import { connect } from 'react-redux'

class HeaderContainer extends React.Component {

  componentDidMount() {
    getAuthData().then((data) => {
      if (data.resultCode === 0) {
        this.props.setUserAuthData(data.data)
      }
    })
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
    setUserAuthData: (authData) => dispatch(setUserAuthDataAC(authData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)

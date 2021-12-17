import React from 'react'
import axios from 'axios'

import Header from './Header'
import { setUserAuthDataAC } from '../../redux/auth-reducer'
import { connect } from 'react-redux'

class HeaderContainer extends React.Component {

  componentDidMount() {
    const authUrl = 'https://social-network.samuraijs.com/api/1.0/auth/me'
    axios.get(authUrl, { withCredentials: true }).then((response) => {
      // debugger
      if (response.data.resultCode === 0) {
        this.props.setUserAuthData(response.data.data)
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

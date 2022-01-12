import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export const withAuthRedirect = (Component) => {
  const RedirectComponent = (props) => {
    // Временно отключил проверку на авторизацию
    // return !props.isAuth ? <Redirect to='/login' /> : <Component {...props} />
    return <Component {...props} />
  }

  const mapStateToProps = (state) => {
    return {
      isAuth: state.auth.isAuth
    }
  }

  const ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)

  return ConnectedRedirectComponent
}
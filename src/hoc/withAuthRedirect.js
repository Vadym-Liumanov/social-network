import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export const withAuthRedirect = (Component) => {
  const RedirectComponent = (props) => {
    return !props.isAuth ? <Redirect to='/login' /> : <Component {...props} />
    // if (!props.isAuth) return <Redirect to='/login' />
    // return <Component {...props} />
  }

  const mapStateToProps = (state) => {
    return {
      isAuth: state.auth.isAuth
    }
  }

  const ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)

  return ConnectedRedirectComponent
}
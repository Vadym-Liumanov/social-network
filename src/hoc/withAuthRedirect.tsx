import React from "react"
import { Navigate } from "react-router-dom"
import { connect } from "react-redux"
import { AppStateType } from '../redux/store-redux'

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth
})

type MapStatePropsType = {
  isAuth: boolean
}
type MapDispatchPropsType = {
}

export function withAuthRedirect<WCP extends object>(WrappedComponent: React.ComponentType<WCP>) {

  const RedirectComponent: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    let { isAuth, ...restProps } = props

    if (!isAuth) return <Navigate replace to='/login' />

    return <WrappedComponent {...restProps as WCP} />
  }

  let ConnectedAuthRedirectComponent = connect<MapStatePropsType, MapDispatchPropsType, WCP, AppStateType>(
    mapStateToProps, {})
    (RedirectComponent)

  return ConnectedAuthRedirectComponent
}
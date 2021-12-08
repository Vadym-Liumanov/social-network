import { connect } from 'react-redux'

import { followToggleAC, setUsersAC } from '../../redux/users-reducer'

import Users from './UsersClassComponent'

let mapStateToProps = (state) => {
  return {
    usersList: state.users.usersList
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    followToggle: (userId) => dispatch(followToggleAC(userId)),
    setUsers: (usersList) => dispatch(setUsersAC(usersList))
  }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer
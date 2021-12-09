import { connect } from 'react-redux'

import { followToggleAC, setUsersAC, setTotalCountAC, setCurrentPageAC } from '../../redux/users-reducer'

import Users from './UsersClassComponent'

let mapStateToProps = (state) => {
  return {
    usersList: state.users.usersList,
    totalCount: state.users.totalCount,
    usersOnPageCount: state.users.usersOnPageCount,
    currentPage: state.users.currentPage
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    followToggle: (userId) => dispatch(followToggleAC(userId)),
    setUsers: (usersList) => dispatch(setUsersAC(usersList)),
    setTotalCount: (totalCount) => dispatch(setTotalCountAC(totalCount)),
    setCurrentPage: (currentPage) => dispatch(setCurrentPageAC(currentPage))
  }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer
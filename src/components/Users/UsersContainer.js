import React from 'react'
import { connect } from 'react-redux'
import * as axios from 'axios'

import { followToggleAC, setUsersAC, setTotalCountAC, setCurrentPageAC, toggleIsFetchingAC } from '../../redux/users-reducer'

import Users from './Users'
import preloader from '../../assets/images/preloader.gif'

class UsersApiReqContainer extends React.Component {

  getApiData = (url) => {
    this.props.toggleIsFetching(true)
    axios.get(url).then((response) => {
      this.props.setUsers(response.data.items)
      this.props.setTotalCount(response.data.totalCount)
      this.props.toggleIsFetching(false)
    })
  }

  componentDidMount() {
    let apiUrl = `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.usersOnPageCount}`
    this.getApiData(apiUrl)
  }

  onPageNumberClick = (pageNumber) => {
    this.props.setCurrentPage(pageNumber)
    let apiUrl = `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.usersOnPageCount}`
    this.getApiData(apiUrl)
  }

  render() {
    return (
      <>
        {this.props.isFetching
          ? <img src={preloader} alt='preloader' />
          : <Users
            usersList={this.props.usersList}
            followToggle={this.props.followToggle}
            totalCount={this.props.totalCount}
            usersOnPageCount={this.props.usersOnPageCount}
            currentPage={this.props.currentPage}
            onPageNumberClick={this.onPageNumberClick}
            isFetching={this.props.isFetching}
          />
        }
      </>

    )

  }
}

let mapStateToProps = (state) => {
  return {
    usersList: state.users.usersList,
    totalCount: state.users.totalCount,
    usersOnPageCount: state.users.usersOnPageCount,
    currentPage: state.users.currentPage,
    isFetching: state.users.isFetching
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    followToggle: (userId) => dispatch(followToggleAC(userId)),
    setUsers: (usersList) => dispatch(setUsersAC(usersList)),
    setTotalCount: (totalCount) => dispatch(setTotalCountAC(totalCount)),
    setCurrentPage: (currentPage) => dispatch(setCurrentPageAC(currentPage)),
    toggleIsFetching: (isFetching) => dispatch(toggleIsFetchingAC(isFetching))
  }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersApiReqContainer)

export default UsersContainer
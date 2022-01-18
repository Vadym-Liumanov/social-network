import React from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { getAuthDataThunk } from './redux/auth-reducer'

import './App.css'

import Header from './components/Header/HeaderContainer'
import Navbar from './components/Navbar/Navbar'

import ProfileContainer from './components/Profile/ProfileContainer'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'
import Login from './components/Login/Login'

import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'

class App extends React.Component {
  componentDidMount() {
    this.props.getAuthDataThunk()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app-wrapper">
          <Header />
          <Navbar />
          <div className="app-wrapper-content">
            <Switch>
              {/* Next string is on v6 react-router-dom format */}
              {/* <Route path='/profile/' element={<Profile />} /> */}
              {/* <Route exact path='/' component={() => <ProfileContainer />} /> */}
              <Route exact path='/profile/' component={() => <Redirect to='/profile/21206' />} />
              <Route path='/profile/:userId' component={() => <ProfileContainer />} />
              <Route exact path='/dialogs' component={() => <DialogsContainer />} />
              <Route exact path='/users' component={() => <UsersContainer />} />
              <Route exact path='/news' component={() => <News />} />
              <Route exact path='/music' component={() => <Music />} />
              <Route exact path='/settings' component={() => <Settings />} />
              <Route exact path='/login' component={() => <Login />} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAuthDataThunk: () => dispatch(getAuthDataThunk())
  }
}

export default connect(null, mapDispatchToProps)(App)

import React from 'react'
// import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { initializeAppThunk } from './redux/app-reducer'

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
import Preloader from './components/common/Preloader/Preloader'
import { AppStateType } from './redux/store-redux'

type PropsType = MapStateProps & MapDispatchProps
type MapStateProps = ReturnType<typeof mapStateToProps>
type MapDispatchProps = ReturnType<typeof mapDispatchToProps>

class App extends React.Component<PropsType> {
  //метод для обработки rejected промисов
  catchAllUnhandledErrors = (event: PromiseRejectionEvent) => {
    // вместо алерта можно запилить dispatch thunk-и, по которой мы будем изменять значение в state.app.globalError
    // by default is null. Туда можем сохранить текст ошибки (или еще какую инфу), потом эту ошибку вывести в UI
    // красиво во всплывающем окне, затем через setTimeOut поле state.app.globalError обнулить - для повторения запроса
    // ну или запросить у юзера нажать button for retry
    alert(event.reason)
    console.error(event)
  }
  componentDidMount() {
    this.props.initializeAppThunk()
    //добавляем событие, по которому мы обрабатываем все необработанные отклоненные rejected промисы
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }

  //удаляем мусор при демонтировании компоненты 
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }

  render() {
    if (!this.props.isAppInitialized) {
      return <Preloader />
    }

    return (
      <HashRouter>
        <div className="app-wrapper">
          <Header />
          <Navbar />
          <div className="app-wrapper-content">
            <Switch>
              {/* Next string is on v6 react-router-dom format */}
              {/* <Route path='/profile/' element={<Profile />} /> */}
              {/* <Route exact path='/' component={() => <ProfileContainer />} /> */}
              <Route exact path='/' component={() => <Redirect to='/profile' />} />
              <Route exact path='/profile' component={() => <ProfileContainer />} />
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
      </HashRouter>
    )
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    isAppInitialized: state.app.isAppInitialized
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    initializeAppThunk: () => dispatch(initializeAppThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

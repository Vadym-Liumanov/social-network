import React, { useEffect } from 'react'
// import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getIsAppInitialized } from './redux/app-selectors'
import { initializeAppThunk } from './redux/app-reducer'

import './App.css'

import Header from './components/Header/HeaderContainer'
import Navbar from './components/Navbar/Navbar'

import ProfileContainer from './components/Profile/ProfileContainer'
import Dialogs from './components/Dialogs/Dialogs'
import Users from './components/Users/Users'
import Login from './components/Login/Login'

import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import Preloader from './components/common/Preloader/Preloader'

const App: React.FC = (props) => {

  const dispatch = useDispatch()
  const isAppInitialized = useSelector(getIsAppInitialized)

  /*
  метод для обработки rejected промисов (необработанных)
  вместо алерта можно запилить dispatch thunk-и, по которой мы будем изменять значение в state.app.globalError
  by default is null. Туда можем сохранить текст ошибки (или еще какую инфу), потом эту ошибку вывести в UI
  красиво во всплывающем окне, затем через setTimeOut поле state.app.globalError обнулить - для повторения запроса
  ну или запросить у юзера нажать button for retry
  */
  const catchAllUnhandledErrors = (event: PromiseRejectionEvent) => {
    alert(event.reason)
    console.error(event)
  }

  const initializeApp = () => dispatch(initializeAppThunk())

  useEffect(() => {
    initializeApp()
    //добавляем событие, по которому мы обрабатываем все необработанные отклоненные rejected промисы
    window.addEventListener("unhandledrejection", catchAllUnhandledErrors)
    return () => {
      // зачищаем мусор перед демонтированием компоненты
      window.removeEventListener("unhandledrejection", catchAllUnhandledErrors)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      {!isAppInitialized
        ? <Preloader />
        :
        <>
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
                  <Route exact path='/dialogs' component={() => <Dialogs />} />
                  <Route exact path='/users' component={() => <Users />} />
                  <Route exact path='/news' component={() => <News />} />
                  <Route exact path='/music' component={() => <Music />} />
                  <Route exact path='/settings' component={() => <Settings />} />
                  <Route exact path='/login' component={() => <Login />} />
                  <Route path='*' component={() => <div>404 NOT FOUND</div>} />
                </Switch>
              </div>
            </div>
          </HashRouter>
        </>
      }
    </div>
  )
}

export default React.memo(App)
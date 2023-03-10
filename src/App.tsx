import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
// import { BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getIsAppInitialized } from './redux/app-selectors'
import { initializeAppThunk } from './redux/app-reducer'

import { getIsAuth } from './redux/auth-selectors'

// import './App.css'
import styles from './App.module.css'

import Header from './components/Header/Header'
import Aside from './components/Aside/Aside'
import Footer from './components/Footer/Footer'

import ProfileContainer from './components/Profile/ProfilePage'
import Dialogs from './components/Dialogs/Dialogs'
import Users from './components/Users/Users'
import LoginPage from './components/LoginPage/LoginPage'

import Preloader from './components/common/Preloader/Preloader'

const App: React.FC = (props) => {

  const dispatch = useDispatch()
  const isAppInitialized = useSelector(getIsAppInitialized)

  const isAuth = useSelector(getIsAuth)

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
    <>
      {!isAppInitialized
        ? <Preloader />
        :
        <>
          {/* <BrowserRouter> */}
          <HashRouter>
            <div className={styles.wrapper}>

              <div className={styles.header}>
                <Header />
              </div>

              <div className={styles.mainRow}>

                {isAuth &&
                  <div className={styles.aside}>
                    <Aside />
                  </div>
                }

                <div className={styles.main}>
                  <Routes>
                    <Route path='/' element={<Navigate replace to='/profile' />} />
                    <Route path='/profile' element={<ProfileContainer />} />
                    <Route path='/profile/:userId' element={<ProfileContainer />} />
                    <Route path='/dialogs' element={<Dialogs />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='*' element={<div>404 NOT FOUND</div>} />
                  </Routes>

                </div>
              </div>

              <div className={styles.footer}>
                <Footer />
              </div>

            </div>
          </HashRouter>
          {/* </BrowserRouter> */}
        </>
      }

    </>
  )
}

export default React.memo(App)
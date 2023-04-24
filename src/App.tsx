import React, { useEffect, Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
// import { BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getIsAppInitialized } from './redux/app-selectors'
import { initializeAppThunk } from './redux/app-reducer'

import { getAuthData } from './redux/auth-selectors'

import styles from './App.module.css'

import Header from './components/Header/Header'
import Aside from './components/Aside/Aside'
import Footer from './components/Footer/Footer'

import ProfilePage from './components/ProfilePage/ProfilePage'
import UsersPage from './components/UsersPage/UsersPage'
import LoginPage from './components/LoginPage/LoginPage'
import ChatPage from './components/ChatPage/ChatPage'

import Preloader from './components/common/Preloader/Preloader'

const App: React.FC = (props) => {

  const dispatch = useDispatch()
  const isAppInitialized = useSelector(getIsAppInitialized)

  const authData = useSelector(getAuthData)
  const { isAuth, id } = authData

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

                <div className={styles.mainRow__container}>

                  <div className={styles.mainRow__wrapper}>

                    {isAuth &&
                      <div className={styles.aside}>
                        <Aside />
                      </div>
                    }
                    
                    <div className={styles.main}>
                      <Routes>
                        <Route path='/' element={<Navigate replace to={`/profile/${id}`} />} />
                        <Route path='/profile' element={<Navigate replace to={`/profile/${id}`} />} />
                        <Route path='/profile/:userId' element={<ProfilePage />} />
                        <Route path='/users' element={<UsersPage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/chat' element={<ChatPage />} />
                        <Route path='*' element={<div>404 NOT FOUND</div>} />
                      </Routes>
                    </div>
                  </div>

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
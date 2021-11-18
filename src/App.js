import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

import './App.css'

import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'

import Profile from './components/Profile/Profile'
import Dialogs from './components/Dialogs/Dialogs'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'

function App(props) {
  // debugger
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <Routes>
            <Route path='/' element={<Profile state={props.state.profile} addPost={props.addPost} updatePost={props.updatePost} />} />
            <Route path='/profile' element={<Profile state={props.state.profile} addPost={props.addPost} updatePost={props.updatePost} />} />
            <Route path='/dialogs' element={<Dialogs state={props.state.messages} />} />
            <Route path='/dialogs/*' element={<Dialogs state={props.state.messages} />} />
            <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;

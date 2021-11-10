import React from 'react'
import './css/App.css'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Profile from './components/Profile'

function App() {
  return (
    <div className="appwrapper">
      <Header/>
      <Sidebar />
      <Profile className="content"/>
    </div>
  );
}

export default App;


import React from 'react'
import Profile from './components/Profile'
import Login from './components/Login'
import './App.css'
import UserContextProvider from './context/UserContextProvider'

function App() {


  return (
    <UserContextProvider>
      <h1>React And GK</h1>

      <Login/>
      <Profile/>
      

    </UserContextProvider>
  )
}

export default App

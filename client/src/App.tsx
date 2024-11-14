import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ControlPanel from './components/pages/ControlPanel'

export default function App() {
  return (
    <div>
      <Routes>
      <Route path='login' element={<Login/>} />
      <Route path='register' element={<Register/>} />
      <Route path='controlPanel' element={<ControlPanel/>} />
      <Route path='/' element={<ControlPanel/>} />
      </Routes>
    </div>
  )
}

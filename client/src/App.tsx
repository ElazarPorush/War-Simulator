import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Home from './components/pages/Home'

export default function App() {
  return (
    <div>
      <Routes>
      <Route path='login' element={<Login/>} />
      <Route path='register' element={<Register/>} />
      <Route path='/' element={<Home/>} />
      </Routes>
    </div>
  )
}

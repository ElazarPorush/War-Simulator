import React, { useEffect, useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchLogin } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import './auth.css'


export default function Login() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (!user?._id) return
    navigate('/controlPanel')
  }, [user])

  useEffect(() => {
    if (user?._id) {
      navigate('/controlPanel')
    }
    console.log(user)
  }, [])

  return (
    <div className="container">
        <section id="content">
            <div className='form'>
                <h1>Login</h1>
                <div>
                    <input type="text" placeholder="Username" required id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <input type="password" placeholder="Password" required id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <button onClick={() => dispatch(fetchLogin({ username, password }))}>Log in</button>
                    <a onClick={() => navigate('/register')}>Don't have an account?</a>
                </div>
            </div>
        </section>
    </div>
  )
}

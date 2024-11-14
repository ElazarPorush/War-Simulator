import React, { useEffect, useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchRegister } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import './auth.css'


export default function Register() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [organization, setOrganization] = useState("")

  useEffect(() => {
    if (!user?._id) return
    navigate('/controlPanel')
  }, [user])

  useEffect(() => {
    if (user?._id) {
      navigate('/controlPanel')
    }
  }, [])

  useEffect(() => {
    if (organization === "IDF"){
      
    }
  }, [organization])

  return (
    <div className="container">
        <section id="content">
            <div className='form'>
                <h1>Register</h1>
                <div>
                    <input type="text" placeholder="Username" required id="username" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <input type="password" placeholder="Password" required id="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <select name="organization" required id='organization' onChange={(e) => setOrganization(e.target.value)}>
                      <option disabled>Organization</option>
                      <option value="Hezbollah">Hezbollah</option>
                      <option value="Hamas">Hamas</option>
                      <option value="IDF">IDF</option>
                      <option value="IRGC">IRGC</option>
                      <option value="Houthis">Houthis</option>
                    </select>
                </div>
                <div style={{"display": "none"}}>
                  <select name="location" required={organization[1] === "D"? true: false} id='location' onChange={(e) => setOrganization("IDF - " + e.target.value)}>
                    <option disabled>Location</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="Center">Center</option>
                    <option value="West Bank">West Bank</option>
                  </select>
                </div>
                <div>
                    <button onClick={() => {
                      dispatch(fetchRegister({ username, password, organization }))
                      navigate('/login')
                  }}>sign up</button>
                    <a onClick={() => navigate('/login')}>Back to login</a>
                </div>
            </div>
        </section>
    </div>
  )
}

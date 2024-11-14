import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { fetchAttacks } from '../../redux/slices/attackSlice'
import { socket } from '../../main'
import AttackCard from './AttackCard'
import userSlice, { fetchUser } from '../../redux/slices/userSlice'

export default function ControlPanel() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.user)
  const { attacks } = useAppSelector(state => state.attacks)
  const [organization, setOrganization] = useState("IDF - North")
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?._id) {
      navigate('/login')
    }
    dispatch(fetchAttacks())
  }, [])

  socket.on("fetch attacks", () => {
    dispatch(fetchAttacks())
  })

  const handleAttack = (missileName: string) => {
    socket.emit("attack", { missileName, from: user?.organization.name, to: organization })
    socket.emit("decrease missile", {missileName, user_id: user?._id})
    dispatch(fetchUser({username: user?.username!, password: user?.password!}))
  }

  const handleLogout = () => {
    dispatch(userSlice.actions.logout());
    localStorage.removeItem("authorization");
    navigate('/login')
  };

  return (
    <div>
      <div className='navBar'>
        <h3>{user?.organization.name}</h3>
        <div style={{"display": user?.organization.name.split(" ")[0] === "IDF" ? "none" : "block"}}>
                  <select name="location" className='location' required={true} onChange={(e) => setOrganization(e.target.value)}>
                    <option disabled>Location</option>
                    <option value="IDF - North">North</option>
                    <option value="IDF - South">South</option>
                    <option value="IDF - Center">Center</option>
                    <option value="IDF - West Bank">West Bank</option>
                  </select>
                </div>
        {user?.organization.name.split(" ")[0] === "IDF" ?
          user?.organization.resources.map(missile => <p>{missile.name} x {missile.amount}</p>) : 
          user?.organization.resources.map(missile => <a onClick={() => handleAttack(missile.name)}>{missile.name} x {missile.amount}</a>)
        }
        <button onClick={handleLogout}>Log Out </button>
      </div>
      <div className='table'>
        <table>
          <tr>
            <th>Rocket</th>
            <th>Time To Left</th>
            <th>Status</th>
          </tr>
          {attacks?.map(attack => (attack.to === user?.organization.name || attack.from === user?.organization.name) ? <AttackCard attack={attack} /> : "")}
        </table>
      </div>
    </div>
  )
}

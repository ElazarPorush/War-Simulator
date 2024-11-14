import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { fetchAttacks } from '../../redux/slices/attackSlice'
import { socket } from '../../main'
import AttackCard from './AttackCard'

export default function ControlPanel() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.user)
  const { attacks } = useAppSelector(state => state.attacks)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?._id) {
      navigate('/login')
    }
    console.log(user)
    dispatch(fetchAttacks())
  }, [])

  const handleAttack = () => {
    socket.emit("attack", { missileName: "Fajr-5", from: "Hezbollah", to: "IDF - South" })
  }

  return (
    <div>
      <div className='navBar'>
          {user?.organization.name[1] === "D"? 
          user?.organization.resources.map(missile => <p>{missile.name} x {missile.amount}</p>) :
          user?.organization.resources.map(missile => <a>{missile.name} x {missile.amount}</a>)
          }
          <button>Log Out</button>
      </div>
      <table>
        <tr>
          <th>Missile Name</th>
          <th>Time To Left</th>
          <th>Status</th>
        </tr>
        {attacks?.map(attack => <AttackCard attack={attack} />)}
      </table>
    </div>
  )
}

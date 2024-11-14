import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { fetchAttacks } from '../../redux/slices/attackSlice'
import { socket } from '../../main'

export default function ControlPanel() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?._id) {
      navigate('/login')
    }
    console.log(user)
    dispatch(fetchAttacks())
  }, [])

  const handleAttack = () => {
    socket.emit("attack", {missileName: "Fajr-5", from: "Hezbollah", to: "IDF - South"})
  }

  return (
    <div>
      <button onClick={handleAttack}>add attack</button>
    </div>
  )
}

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { useNavigate } from 'react-router-dom'

export default function ControlPanel() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?._id) {
      navigate('/login')
    }
    console.log(user)
    // dispatch(fetchCandidates())
  }, [])
  return (
    <div>
      hello
    </div>
  )
}

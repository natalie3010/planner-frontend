import React from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../Slices/LoginSlice'

export const Navigation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <CG.Navigation
      inputPlaceholder='Search'
      withButtons
      homeIcon={{
        type: 'Building',
        height: '26px',
        width: '26px',
      }}
      homeLink={{
        name: 'Workforce Planner',
        url: '/dashboard',
      }}
      buttons={[
        {
          buttonText: 'Home',
          onClick: () => {
            navigate('/dashboard')
          },
        },
        {
          buttonText: 'About',
          onClick: () => {
            navigate('/about')
          },
        },
        {
          buttonText: 'Logout',
          onClick: () => {
            dispatch(logout())
          },
        },
      ]}
    />
  )
}

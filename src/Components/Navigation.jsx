import React from 'react'
import { CG } from 'cap-shared-components'
import { useDispatch } from 'react-redux'
import { logout } from '../Slices/LoginSlice'

export const Navigation = () => {
  const dispatch = useDispatch()

  return <div>yoo</div> /* (
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
          buttonText: 'Contact Us',
          onClick: () => {},
        },
        {
          buttonText: 'Logout',
          onClick: () => {
            dispatch(logout())
          },
        },
      ]}
    />
  ) */
}

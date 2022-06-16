import React, { useContext } from 'react'
import { CG } from 'cap-shared-components'
import { myContext } from '../index'

export const Navigation = () => {
  const appContext = useContext(myContext)
  const logout = () => {
    appContext.requestDispatch({ type: 'USER_LOGOUT' })
    console.log('logout requested')
  }
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
          buttonText: 'Contact Us',
          onClick: () => {},
        },
        {
          buttonText: 'Logout',
          onClick: () => {
            logout()
          },
        },
      ]}
    />
  )
}

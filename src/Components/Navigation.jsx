import React from 'react'
import { CG } from 'cap-shared-components'

export const Navigation = () => {
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
          onClick: () => {},
        },
      ]}
    />
  )
}

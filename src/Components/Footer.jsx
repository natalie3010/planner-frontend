import React from 'react'
import { CG } from 'cap-shared-components'

export const Footer = () => {
  return (
    <CG.Footer style={{position:"fixed",bottom:"0"}}>
      <CG.HomeLink
        homeLink={{ name: 'Workforce Planner', url: '/workforcePlanner' }}
        homeIcon={{ type: 'LogoAlt3', height: '26px', width: '26px' }}
      />
    </CG.Footer>
  )
}

import React from 'react'
import { CG } from 'cap-shared-components'

export const Footer = () => {
  return (
    <CG.Box padding='20px' position='relative' bottom='0' width='100%'>
      <CG.Footer style={{ padding: '20px' }}>
        <CG.HomeLink
          homeLink={{ name: 'workforce Planner', url: '/workforcePlanner' }}
          homeIcon={{ type: 'LogoAlt3', height: '26px', width: '26px' }}
        />
      </CG.Footer>
    </CG.Box>
  )
}

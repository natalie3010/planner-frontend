import React from 'react'
import { CG } from 'cap-shared-components'
import { useLocation } from 'react-router-dom'
import logo from './Assets/Capture.PNG'

export const Footer = () => {
  const location = useLocation()
  return (
    location.pathname !== '/account/login' &&
    location.pathname !== '/' && (
      <CG.Footer style={{ marginTop: 'auto', backgroundColor: 'white' }}>
        <CG.Box>
          <a href='/workforcePlanner'>
            <img
              src={logo}
              alt='logo'
              style={{
                width: '94px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                width: '94px',
                left: '74px',
                top: '767px',
              }}
            />
          </a>
        </CG.Box>
      </CG.Footer>
    )
  )
}

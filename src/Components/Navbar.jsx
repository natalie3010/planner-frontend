import React from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const navigate = useNavigate()

  return (
    <CG.NavbarContainer>
      <CG.NavbarContent>
        <CG.HomeLink
          homeLink={{ url: '?path=/story/template-cashorted--cashorted' }}
          homeIcon={{
            type: 'WorkforcePlanner',
            height: '50px',
            width: '200px',
          }}
        />
        <div style={{ alignSelf: 'center' }}>
          <CG.Button text='Home' onClick={() => navigate('/protectedRoute/dashboard')} />

          <span> </span>

          <CG.Button text='About' onClick={() => navigate('/about')} />

          <span> </span>
        </div>
      </CG.NavbarContent>
    </CG.NavbarContainer>
  )
}

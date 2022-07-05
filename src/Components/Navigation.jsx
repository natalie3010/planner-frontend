import React from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../Slices/LoginSlice'

export const Navigation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

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

          <CG.Button
            text='Logout'
            onClick={() => {
              dispatch(logout())
            }}
          />
        </div>
      </CG.NavbarContent>
    </CG.NavbarContainer>
  )
}

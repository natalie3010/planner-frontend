import React from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Slices/LoginSlice'

export const Navigation = () => {
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
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
        {userLoggedIn && (
          <div style={{ alignSelf: 'center' }}>
            {location.pathname !== '/protectedRoute/dashboard' && (
              <CG.Button text='Home' onClick={() => navigate('/protectedRoute/dashboard')} />
            )}{' '}
            <span> </span>
            <CG.Button text='About' onClick={() => navigate('/about')} />
            <span> </span>
            <CG.Button
              text='Log out'
              onClick={() => {
                dispatch(logout())
              }}
            />
          </div>
        )}
      </CG.NavbarContent>
    </CG.NavbarContainer>
  )
}

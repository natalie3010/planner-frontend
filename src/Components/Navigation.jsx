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
          <CG.Box flexDirection='row' justifyContent='space-between' display='flex' alignSelf='center'>
            {location.pathname !== '/protectedRoute/dashboard' && (
              <CG.Box mr='5px'>
                <CG.Button text='Home' onClick={() => navigate('/protectedRoute/dashboard')} />
              </CG.Box>
            )}{' '}
            <CG.Box mr='5px'>
              <CG.Button text='About' onClick={() => navigate('/about')} />
            </CG.Box>
            <CG.Box mr='5px'>
              <CG.Button
                text='Log out'
                onClick={() => {
                  dispatch(logout())
                  localStorage.removeItem('authToken')
                  localStorage.removeItem('refreshToken')
                  localStorage.removeItem('loginTime')
                }}
              />
            </CG.Box>
          </CG.Box>
        )}
      </CG.NavbarContent>
    </CG.NavbarContainer>
  )
}

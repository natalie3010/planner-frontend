import React from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Slices/LoginSlice'
import { logoutAPI } from '../API'
import logo2 from './Assets/wfp.png'

export const Navigation = () => {
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  return (
    <CG.NavbarContainer >
      <CG.NavbarContent style={{backgroundColor: '#0070AD', height: '45px' }} >

   
      
        <div style={{display: 'flex', alignItems: 'center', color: '#FFFFFF', top: '13px', left: '67px', height: '24px', textAlign: 'left', letterSpacing: '0px', opacity: '1', gap: '8px'}} >
        <a href="/workforcePlanner">
        <img src={logo2} alt="logo2" style={{display: 'flex', alignItems: 'center', width: '40px', height: '40px', left: '16px', top: '4px'}} />
        </a>
        <h3> Workforce Planner </h3>
        </div>

      </CG.NavbarContent>
    </CG.NavbarContainer>
  )
}

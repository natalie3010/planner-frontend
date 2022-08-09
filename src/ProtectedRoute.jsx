import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userNotLoggedIn } from './Slices/LoginSlice'
import useRefreshToken from './Hooks/TokenHook'

export const ProtectedRoute = ({ element: element, ...rest }) => {
  const authToken = useRefreshToken()
  const location = useLocation()
  const dispatch = useDispatch()
  dispatch(userNotLoggedIn(location.pathname))
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn)
  if (!userLoggedIn) return <Navigate replace to='/login' state={location} noThrow />
  return <element {...rest} />
}

import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, userNotLoggedIn } from './Slices/LoginSlice'
import useRefreshToken from './Hooks/TokenHook'
import { useEffect } from 'react'

export const ProtectedRoute = ({ element: element, ...rest }) => {
  const authToken = useRefreshToken()
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (authToken) {
      dispatch(login(authToken))
    }
  }, [authToken])

  dispatch(userNotLoggedIn(location.pathname))
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn)
  if (!userLoggedIn) return <Navigate replace to='/login' state={location} noThrow />
  return <element {...rest} />
}

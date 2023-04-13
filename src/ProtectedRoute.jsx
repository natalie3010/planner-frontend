import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export const ProtectedRoute = ({ element: element, ...rest }) => {
  const location = useLocation()

  const userLoggedIn = useSelector((state) => state.user.userLoggedIn)
  if (!userLoggedIn) return <Navigate replace to='/account/login' state={location} noThrow />
  return <element {...rest} />
}

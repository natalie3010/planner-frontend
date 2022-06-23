import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const ProtectedRoute = ({ element: element, ...rest }) => {
  const location = useLocation()
  console.log('protected: ', location)
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn)
  if (!userLoggedIn) return <Navigate replace to='/login' state={location} noThrow />
  return <element {...rest} />
}

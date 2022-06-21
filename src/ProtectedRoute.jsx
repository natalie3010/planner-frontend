import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const ProtectedRoute = ({ element: element, ...rest }) => {
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn)
  if (!userLoggedIn) return <Navigate replace to='/login' noThrow />
  return <element {...rest} />
}

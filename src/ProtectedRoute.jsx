import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ element: element, ...rest }) => {
  const loggedIn = false

  if (!loggedIn) return <Navigate replace to='/login' noThrow />
  return <element {...rest} />
}

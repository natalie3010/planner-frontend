import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { myContext } from '../src/index'

export const ProtectedRoute = ({ element: element, ...rest }) => {
  const value = useContext(myContext)
  if (!value.state.isLoggedIn) return <Navigate replace to='/login' noThrow />
  return <element {...rest} />
}

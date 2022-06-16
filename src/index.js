import React, { useReducer } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Dashboard } from './Containers/Dashboard'
import { Login } from './Containers/Login'
import { ProtectedRoute } from './ProtectedRoute'
import { SupplyPage } from './Containers/SupplyPage'
import { EditSupply } from './Containers/EditSupply'
import initState from '../src/store'
import allReducers from './Reducers/allReducers'

export const myContext = React.createContext()

const Router = () => {
  const [state, dispatch] = useReducer(allReducers, initState)

  const requestDispatch = (dispatchParameters) => {
    dispatch(dispatchParameters)
  }

  return (
    <myContext.Provider value={{ state, requestDispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/supply'
            element={
              <ProtectedRoute>
                <SupplyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/edit-supply'
            element={
              <ProtectedRoute>
                <EditSupply />
              </ProtectedRoute>
            }
          />
          <Route
            path='/protectedRoute/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </myContext.Provider>
  )
}
createRoot(document.getElementById('root')).render(<Router />)

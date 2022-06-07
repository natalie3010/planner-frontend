import React, { useReducer } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Dashboard } from './Containers/Dashboard'
import { Login } from './Containers/Login'
import { ProtectedRoute } from './ProtectedRoute'
import { SupplyPage } from './Containers/SupplyPage'
import initState from '../src/store'
import loginReducer from '../src/loginReducer'

export const myContext = React.createContext()

const Router = () => {
  const [state, dispatch] = useReducer(loginReducer, initState)

  const requestDispatch = (authToken) => {
    console.log('-------------- Requesting dispatch --------------')
    dispatch({ type: 'USER_LOGIN', authToken: authToken })
  }

  return (
    <myContext.Provider value={{ state, requestDispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/supply' element={<SupplyPage />} />
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

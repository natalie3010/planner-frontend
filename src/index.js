import React, { useReducer } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Dashboard } from './Containers/Dashboard'
import { Login } from './Containers/Login'
import { ProtectedRoute } from './ProtectedRoute'
import { SupplyPage } from './Containers/SupplyPage'
import { About } from './Containers/About'
import { Information } from './Containers/SupplyInfo'
import { DemandInformation } from './Containers/DemandInfo'
import initState from '../src/store'
import allReducers from './Reducers/allReducers'
import { Home } from './Components/Home'

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
          {/* <Route path='/' element={<Home />} /> */}
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
            path='/protectedRoute/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path='/about'
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />

          <Route
            path='/supplyinfo/:skillname'
            element={
              <ProtectedRoute>
                <Information />
              </ProtectedRoute>
            }
          />

          <Route
            path='/demandinfo/:skillname'
            element={
              <ProtectedRoute>
                <DemandInformation />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </myContext.Provider>
  )
}
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)

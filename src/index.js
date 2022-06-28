import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Dashboard } from './Containers/Dashboard'
import { Login } from './Containers/Login'
import { ProtectedRoute } from './ProtectedRoute'
import { SupplyPage } from './Containers/SupplyPage'
import { About } from './Containers/About'
import { Information } from './Containers/SupplyInfo'
import { DemandInformation } from './Containers/DemandInfo'

import allReducers from './Reducers/allReducers'
import { Home } from './Components/Home'
import { EditSupply } from './Containers/EditSupply'
import { store } from '../src/store'
import { Provider } from 'react-redux'

const App = () => {
  return (
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
          path='/protectedRoute/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
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
  )
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

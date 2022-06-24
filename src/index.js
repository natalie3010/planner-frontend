import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Dashboard } from './Containers/Dashboard'
import { Login } from './Containers/Login'
import { ProtectedRoute } from './ProtectedRoute'
import { SupplyPage } from './Containers/SupplyPage'
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
  )
}
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

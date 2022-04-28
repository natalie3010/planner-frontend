import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Dashboard } from './Containers/Dashboard'
import { Login } from './Containers/Login'
import { ProtectedRoute } from './ProtectedRoute'
const Router = (
  <BrowserRouter>
    <Routes>
      <Route path='/*' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route
        path='/protectedRoute/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* <ProtectedRoute path='dashboard' element={<Dashboard />} /> */}
    </Routes>
  </BrowserRouter>
)

createRoot(document.getElementById('root')).render(Router)

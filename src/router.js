import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './Containers/Dashboard'
import { Login } from './Containers/Login'
import { ProtectedRoute } from './ProtectedRoute'
import { SupplyPage } from './Containers/SupplyPage'
import { About } from './Components/About'
import { ListSupply } from './Containers/ListSupply'
import { ListDemand } from './Containers/ListDemand'
import { DemandPage } from './Containers/DemandPage'
import { EditSupply } from './Containers/EditSupply'
import { EditDemand } from './Containers/EditDemand'
import { ListClients } from './Containers/ListClients'
import { ListAllSupply } from './Containers/ListAllSupply'
import { ListAllDemand } from './Containers/ListAllDemand'
import { Register } from './Containers/Register'

export const Router = () => {
  return (
    <Routes>
      <Route path='/*' element={<Login />} />

      <Route path='/account/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route
        path='/demand/new'
        element={
          <ProtectedRoute>
            <DemandPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/demand/update/:demandId'
        element={
          <ProtectedRoute>
            <EditDemand />
          </ProtectedRoute>
        }
      />
      <Route
        path='/supply/new'
        element={
          <ProtectedRoute>
            <SupplyPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/clients/all'
        element={
          <ProtectedRoute>
            <ListClients />
          </ProtectedRoute>
        }
      />
      <Route
        path='/supply/all'
        element={
          <ProtectedRoute>
            <ListAllSupply />
          </ProtectedRoute>
        }
      />
      <Route
        path='/demand/all'
        element={
          <ProtectedRoute>
            <ListAllDemand />
          </ProtectedRoute>
        }
      />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/supply/update/:applicantId'
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
        path='/supply/all/skill/:skillID'
        element={
          <ProtectedRoute>
            <ListSupply />
          </ProtectedRoute>
        }
      />

      <Route
        path='/demand/all/skill/:skillID'
        element={
          <ProtectedRoute>
            <ListDemand />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

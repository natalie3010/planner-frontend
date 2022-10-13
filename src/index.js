import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navigation } from './Components/Navigation'
import { Footer } from './Components/Footer'
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
import { setupStore } from '../src/store'
import { Provider } from 'react-redux'
import { CG } from 'cap-shared-components'
import { WorkforcePlanner } from '../themes/workforcePlanner'
import { ListClients } from './Containers/ListClients'
import { ListAllSupply } from './Containers/ListAllSupply'
import { ListAllDemand } from './Containers/ListAllDemand'

const App = () => {
  return (
    <Routes>
      <Route path='/*' element={<Login />} />

      <Route path='/login' element={<Login />} />
      <Route
        path='/demand'
        element={
            <DemandPage />
        }
      />
      <Route
        path='/edit-demand/:demandId'
        element={
            <EditDemand />
        }
      />
      <Route
        path='/supply'
        element={
            <SupplyPage />
        }
      />
      <Route
        path='/listClients'
        element={
            <ListClients />
        }
      />
      <Route
        path='/listAllSupply'
        element={
            <ListAllSupply />
        }
      />
      <Route
        path='/listAllDemand'
        element={
            <ListAllDemand />
        }
      />
      <Route
        path='/dashboard'
        element={
            <Dashboard />
        }
      />
      <Route
        path='/edit-supply/:applicantId'
        element={
            <EditSupply />
        }
      />
      <Route
        path='/about'
        element={
            <About />
        }
      />

      <Route
        path='/list-supply/:skillID'
        element={
            <ListSupply />
        }
      />

      <Route
        path='/list-demand/:skillID'
        element={
            <ListDemand />
        }
      />
    </Routes>
  )
}

createRoot(document.getElementById('root')).render(
  <Provider store={setupStore()}>
    <BrowserRouter>
      <CG.ThemeProvider theme={WorkforcePlanner}>
        <Navigation />
        <App />
        <Footer />
      </CG.ThemeProvider>
    </BrowserRouter>
  </Provider>
)

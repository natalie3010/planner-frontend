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
import { store } from '../src/store'
import { Provider } from 'react-redux'
import { CG } from 'cap-shared-components'
import { WorkforcePlanner } from '../themes/workforcePlanner'

const App = () => {
  return (
    <Routes>
      <Route path='/*' element={<Login />} />

      <Route path='/login' element={<Login />} />
      <Route
        path='/demand'
        element={
          <ProtectedRoute>
            <DemandPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/edit-demand'
        element={
          <ProtectedRoute>
            <EditDemand />
          </ProtectedRoute>
        }
      />
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
        path='/list-supply/:skillname'
        element={
          <ProtectedRoute>
            <ListSupply />
          </ProtectedRoute>
        }
      />

      <Route
        path='/list-demand/:skillname'
        element={
          <ProtectedRoute>
            <ListDemand />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <CG.ThemeProvider theme={WorkforcePlanner}>
        <Navigation />
        <App />
        <Footer />
      </CG.ThemeProvider>
    </BrowserRouter>
  </Provider>
)

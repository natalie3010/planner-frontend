import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navigation } from './Components/Navigation'
import { Footer } from './Components/Footer'
import { setupStore } from '../src/store'
import { Provider } from 'react-redux'
import { CG } from 'cap-shared-components'
import { WorkforcePlanner } from '../themes/workforcePlanner'
import { Router } from './router'

createRoot(document.getElementById('root')).render(
  <Provider store={setupStore()}>
    <BrowserRouter>
      <CG.ThemeProvider theme={WorkforcePlanner}>
        <Navigation />
        <Router />
        <Footer />
      </CG.ThemeProvider>
    </BrowserRouter>
  </Provider>
)

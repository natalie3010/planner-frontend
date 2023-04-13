import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import {setupStore} from '../store'

export const renderWithProviders = (
  container,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>
  return { store, ...render(container, { wrapper: Wrapper, ...renderOptions }) }
}
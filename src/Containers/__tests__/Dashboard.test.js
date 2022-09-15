import React from 'react'
import 'jest-canvas-mock'
import { act } from 'react-dom/test-utils'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../../Utils/testSetup'
import { setupStore } from '../../store'
import { login } from '../../Slices/LoginSlice'
import { Dashboard } from '../Dashboard'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }))

jest.mock('../../API', () => ({
  getAllDemand: jest.fn(() => Promise.resolve([{ status: 'test-demand' }])),
  getAllSupply: jest.fn(() => Promise.resolve([{ ApplicantStatus: 'test-supply' }])),
  getSkills: jest.fn(() => Promise.resolve([{ skillName: 'test-skill' }])),
}))

xdescribe('Testing <Dashboard/> component', () => {
  describe('Different stages of Dashboard component', () => {
    it('should display "loading" initially', async () => {
      act(() => {
        renderWithProviders(<Dashboard />, {
          preloadedState: {
            user: { authToken: 'test-token' },
          },
        })
      })
      expect(
        await waitFor(() => {
          screen.getByText("'loading...'", { exact: false })
        })
      ).toBeInTheDocument
    })

    it('should display Bar chart after data is successfully loaded', async () => {
      const store = setupStore()
      store.dispatch(login('test-auth-token'))
      await act(async () => {
        renderWithProviders(<Dashboard />, { store })
      })
      expect(
        await waitFor(() => {
          screen.getByRole('img')
        })
      ).toBeInTheDocument
    })
  })
  describe('Actions on Dashboard page', () => {
    it('should test Add a supply action', async () => {
      await act(async () => {
        renderWithProviders(<Dashboard />)
      })
      fireEvent(
        screen.getByText(/add a supply/i),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
      expect(mockNavigate).toHaveBeenCalledWith('/supply')
    })
    it('should test List Clients action', async () => {
      await act(async () => {
        renderWithProviders(<Dashboard />, {
          preloadedState: {
            user: { authToken: 'test-token' },
          },
        })
      })
      fireEvent(
        screen.getByText(/list clients/i),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
      expect(mockNavigate).toHaveBeenCalledWith('/listClients')
    })
    it('should test Add a demand button', async () => {
      await act(async () => {
        renderWithProviders(<Dashboard />, {
          preloadedState: {
            user: { authToken: 'test-token' },
          },
        })
      })
      fireEvent(
        screen.getByText(/add a demand/i),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
      expect(mockNavigate).toHaveBeenCalledWith('/demand')
    })
    it('should test List All Supply button', async () => {
      await act(async () => {
        renderWithProviders(<Dashboard />, {
          preloadedState: {
            user: { authToken: 'test-token' },
          },
        })
      })
      fireEvent(
        screen.getByText(/list all supply/i),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
      expect(mockNavigate).toHaveBeenCalledWith('/listAllSupply')
    })
    it('should test List All Demand button', async () => {
      await act(async () => {
        renderWithProviders(<Dashboard />, {
          preloadedState: {
            user: { authToken: 'test-token' },
          },
        })
      })
      fireEvent(
        screen.getByText(/list all demand/i),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
      expect(mockNavigate).toHaveBeenCalledWith('/listAllDemand')
    })
  })
})

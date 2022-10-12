import React from 'react'
import { act } from 'react-dom/test-utils'
import { screen, waitFor, fireEvent, within } from '@testing-library/react'
import { ListDemand } from '../ListDemand'
import { renderWithProviders } from '../../Utils/testSetup'
import { setupStore } from '../../store'
import api from '../../API'
import { setupDashboard } from '../../Slices/DashboardSlice'

// TESTING 101
// RENDER component
// QUERY component
// INTERACT with component
// ASSERT on that component

// MOCK REACT-ROUTER HOOKS

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ skillname: 'React' }),
}))

// MOCK DATA FOR MOCK API

// removeDemandfromDashboard - requires skillname
// In delete function this is coming from useParams()

const config = {
  demandSkill: [
    {
      DemandID: 1,
      CodeRequisition: 123,
      ClientName: 'TestClientName',
      Probabilitiy: null,
      StartDate: '01/01/2023',
      Grade: 'TestGrade',
      Status: 'TestDemandStatus',
    },
  ],
}

// MOCK API CALLS

jest.mock('../../API', () => jest.fn())

describe('Testing <ListDemand/> component', () => {
  describe('Different stages of List Demand Component loading', () => {
    it('should show "No Demand Left" if no records to display', async () => {
      api.getDemandSkill = jest.fn(() => Promise.resolve({}))

      await act(() => {
        renderWithProviders(<ListDemand />, {
          preloadedState: {
            user: { authToken: 'test-token' },
          },
        })
      })

      await waitFor(() => {
        expect(screen.getByText('No Demand Left')).toBeInTheDocument
      })
    })

    it('should show records in table if there are records to display', async () => {
      api.getDemandSkill = jest.fn(() => Promise.resolve(config.demandSkill))
      await act(() => {
        renderWithProviders(<ListDemand />)
      })

      await waitFor(() => {
        expect(screen.getByText('TestClientName')).toBeInTheDocument
      })
    })

    // it('should show "Demand Information for React" at top of page'),
    // it('should render an Add Demand Button'),
    // it('should render a Dashboard Button')
  })

  describe('Testing page navigations', () => {
    it('Should test Add Demand button navigation to <DemandPage />', async () => {
      api.getDemandSkill = jest.fn(() => Promise.resolve({}))

      renderWithProviders(<ListDemand />)
      fireEvent(
        screen.getByText(/Add Demand/i),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
      expect(mockNavigate).toHaveBeenCalledWith('/demand')
    })

    it('Should test Dashboard button navigation through to <Dashboard />', async () => {
      api.getDemandSkill = jest.fn(() => Promise.resolve({}))

      renderWithProviders(<ListDemand />)
      fireEvent(
        screen.getByText(/dashboard/i),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    })
  })

  describe('Testing page actions', () => {
    it('should delete record when delete button is clicked', async () => {
      // set up a Redux store
      const store = setupStore()

      // setUpDashboard - action never dispatched, so we dispatch it here
      store.dispatch(setupDashboard([{ skill_name: 'React', demand_count: 1 }]))

      // Creating a const of our redux dispatch
      const reduxDispatch = store.dispatch

      // Adding mock function wrapper around redux dispatch
      store.dispatch = jest.fn(reduxDispatch)

      api.getDemandSkill = jest.fn(() => Promise.resolve(config.demandSkill))
      const deleteMock = jest.fn(() => Promise.resolve({}))
      api.deleteDemand = deleteMock

      await act(() => {
        renderWithProviders(<ListDemand />, { store })
      })

      const row = screen.getAllByRole('row')[1]
      // selecting delete icon in final cell of table row
      const deleteButtonEl = within(row).getAllByRole('cell')[8]

      //Both delete and edit have the same alt text -
      // const elements = await screen.findAllByAltText('icon')
      // const elements = await screen.findAllByRole('graphics-document')

      fireEvent(
        deleteButtonEl,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )

      expect(await waitFor(() => store.dispatch)).toHaveBeenCalledWith({
        payload: 'React',
        type: 'dashboard/removeDemandFromDashboard',
      })
    })

    it('should test edit button navigation through to <EditDemand /> page', async () => {
      api.getDemandSkill = jest.fn(() => Promise.resolve(config.demandSkill))
      await act(() => {
        renderWithProviders(<ListDemand />)
      })

      const row = screen.getAllByRole('row')[1]
      const editButtonEl = within(row).getAllByRole('cell')[7]

      console.log(editButtonEl)
      fireEvent(
        editButtonEl,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
      expect(mockNavigate).toHaveBeenCalledWith(`/edit-demand/${config.demandSkill[0].DemandID}`)
    })
  })
})

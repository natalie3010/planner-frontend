import React from 'react'
import { act } from 'react-dom/test-utils'
import { screen, waitFor, fireEvent, within } from '@testing-library/react'
import { renderWithProviders } from '../../Utils/testSetup'
import { EditDemand } from '../EditDemand'
import { setupStore } from '../../store'
import { setupDashboard } from '../../Slices/DashboardSlice'
import { demandSchema } from '../../Validations/DemandValidation'
import { updateDemand, getClients, getSkills, getSingleDemand } from '../../API'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ demandId: '1' }),
}))

jest.mock('../../Validations/DemandValidation', () => ({
  demandSchema: { isValid: jest.fn(() => Promise.resolve(true)) },
}))

jest.mock('../../API', () => ({
  getClients: jest.fn(() => Promise.resolve([{ id: 'test-clients', name: 'test-client-name' }])),
  getSingleDemand: jest.fn(() => Promise.resolve({ DemandStatus: 'test-single-demand', demandSkills: 1 })),
  getSkills: jest.fn(() =>
    Promise.resolve([
      { name: 'test-skill', id: 1 },
      { name: 'react', id: 2 },
    ])
  ),
  updateDemand: jest.fn(() => Promise.resolve(true)),
}))

describe('Different stages of EditDemand component', () => {
  it('should display "loading" initially', async () => {
    getSkills.mockImplementationOnce(() => Promise.resolve(null))
    getClients.mockImplementationOnce(() => Promise.resolve(null))
    getSingleDemand.mockImplementationOnce(() => Promise.resolve(null))
    await act(() => {
      renderWithProviders(<EditDemand />, {
        preloadedState: {
          user: { authToken: 'test-token' },
        },
      })
    })
    expect(
      await waitFor(() => {
        screen.findByText('loading...', { exact: false })
      })
    ).toBeInTheDocument
  })
  it('should display "Edit a demand" after successfully loaded', async () => {
    await act(async () => {
      renderWithProviders(<EditDemand />)
    })

    expect(
      await waitFor(() => {
        screen.findByText('Edit a demand')
      })
    ).toBeInTheDocument
  })
})

it('should throw error if form data is not submitted', async () => {
  await act(async () => {
    renderWithProviders(<EditDemand />)
  })

  fireEvent(
    screen.getByText(/submit/i),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )
  expect(updateDemand).not.toHaveBeenCalled()
})
it('should not call api if form is invalid', async () => {
  demandSchema.isValid.mockReturnValueOnce(false)

  await act(async () => {
    renderWithProviders(<EditDemand />)
  })

  fireEvent(
    screen.getByText(/submit/i),

    new MouseEvent('click', {
      bubbles: true,

      cancelable: true,
    })
  )

  expect(updateDemand).not.toHaveBeenCalled()
})

it('should call updateDemand if form data is submitted accordingly', async () => {
  updateDemand.mockImplementation(() => Promise.resolve(true))

  await act(async () => {
    renderWithProviders(<EditDemand />)
  })
  fireEvent.input(screen.getByText('Start date').nextSibling, {
    target: { value: '10/1/2020' },
  })

  expect(screen.getByText('Start date').nextSibling.value).toBe('10/1/2020')
  await waitFor(() => {
    fireEvent(
      screen.getByText(/submit/i),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )
  })
  expect(await waitFor(() => updateDemand)).toHaveBeenCalledTimes(1)
})

it('should call addDemandToDashboard if form data  is successfully submitted', async () => {
  updateDemand.mockImplementation(() => Promise.resolve('1', { demand: {name: 'test-skill2', id: '1'} }))

  const store = setupStore()
  store.dispatch(
    setupDashboard([
      { skill_name: 'test-skill', demand_count: 1 },
      { skill_name: 'react', demand_count: 1 },
    ])
  )

  const originalDispatch = store.dispatch
  store.dispatch = jest.fn(originalDispatch)

  await act(async () => {
    renderWithProviders(<EditDemand />, { store })
  })

  fireEvent.input(screen.getByText('Code Requisition').nextSibling, {
    target: { value: 'test-code-requisition' },
  })

  const skillSelector = await screen.findByTestId('Skill')
  const skillButton = within(skillSelector).getByRole('button')

  await waitFor(() => {
    fireEvent(
      skillButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )
  })

  const skillOption = await screen.findByRole('button', { name: /react/i })

  fireEvent(
    skillOption,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )

  fireEvent(
    screen.getByText(/submit/i),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )

  expect(await waitFor(() => store.dispatch)).toHaveBeenNthCalledWith(1, {
    payload: 'test-skill',
    type: 'dashboard/removeDemandFromDashboard',
  })
  expect(await waitFor(() => store.dispatch)).toHaveBeenNthCalledWith(2, {
    payload: 'react',
    type: 'dashboard/addDemandToDashboard',
  })
})

describe('User action on components', () => {
  it('click cancel with navigate to EditDemand', async () => {
    await act(async () => {
      renderWithProviders(<EditDemand />)
    })

    const cancelButton = screen.getByRole('button', {
      name: /cancel/i,
    })

    await waitFor(() => {
      fireEvent(
        cancelButton,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
    })

    expect(mockNavigate).toHaveBeenCalledWith('/list-Demand/test-skill')
  })
})

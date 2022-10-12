import React from 'react'
import { act } from 'react-dom/test-utils'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../../Utils/testSetup'
import { DemandPage } from '../DemandPage'
import { addDemand } from '../../API'
import { setupStore } from '../../store'
import { demandSchema } from '../../Validations/DemandValidation'
import { setupDashboard } from '../../Slices/DashboardSlice'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

jest.mock('../../Validations/DemandValidation', () => ({
  demandSchema: { isValid: jest.fn(() => Promise.resolve(true)) },
}))

jest.mock('../../API', () => ({
  getClients: jest.fn(() => Promise.resolve([{ ClientID: 'test-clients', ClientName: 'test-client-name' }])),
  getSkills: jest.fn(() =>
    Promise.resolve([
      { SkillName: 'React', SkillsID: '1' },
      { SkillName: 'Angular', SkillsID: '2' },
    ])
  ),
  addDemand: jest.fn(),
}))

describe('Testing <DemandPage/> component', () => {
  it('should display "loading" initially', async () => {
    act(() => {
      renderWithProviders(<DemandPage />)
    })
    expect(
      await waitFor(() => {
        screen.getByText('loading...', { exact: false })
      })
    ).toBeInTheDocument
  })
  it('should display "Add a new demand" after successfully loaded', async () => {
    await act(async () => {
      renderWithProviders(<DemandPage />)
    })

    expect(
      await waitFor(() => {
        screen.getByText('Add a new demand', { exact: false })
      })
    ).toBeInTheDocument
  })

  it('should throw error if form data is not submitted', async () => {
    await act(async () => {
      renderWithProviders(<DemandPage />)
    })

    fireEvent(
      screen.getByText(/submit/i),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )
    expect(addDemand).not.toHaveBeenCalled()
  })

  it('should not call api if form is invalid', async () => {
    demandSchema.isValid.mockReturnValueOnce(false)

    await act(async () => {
      renderWithProviders(<DemandPage />)
    })

    fireEvent(
      screen.getByText(/submit/i),

      new MouseEvent('click', {
        bubbles: true,

        cancelable: true,
      })
    )

    expect(addDemand).not.toHaveBeenCalled()
  })

  it('should call addDemand if form data is submitted accordingly', async () => {
    addDemand.mockImplementation(() => Promise.resolve(true))

    await act(async () => {
      renderWithProviders(<DemandPage />)
    })
    fireEvent.input(screen.getByText('Start date').nextSibling, {
      target: { value: '10/1/2020' },
    })

    expect(screen.getByText('Start date').nextSibling.value).toBe('10/1/2020')

    fireEvent(
      screen.getByText(/submit/i),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )
    expect(await waitFor(() => addDemand)).toHaveBeenCalledTimes(1)
  })

  it('should call addDemandToDashboard if form data  is successfully submitted', async () => {
    addDemand.mockImplementation(() => Promise.resolve({ SkillName: 'React', SkillsID: '1' }))

    const store = setupStore()
    store.dispatch(setupDashboard([{ skill_name: 'React', demand_count: 1 }]))

    const originalDispatch = store.dispatch
    store.dispatch = jest.fn(originalDispatch)

    await act(async () => {
      renderWithProviders(<DemandPage />, { store })
    })

    fireEvent.input(screen.getByText('Code Requisition').nextSibling, {
      target: { value: 'test-code-requisition' },
    })

    const skillSelector = screen.getByRole('button', { name: /select a skill/i })
    fireEvent(
      skillSelector,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )

    const reactOption = screen.getByRole('button', { name: /React/i })

    fireEvent(
      reactOption,
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

    expect(await waitFor(() => store.dispatch)).toHaveBeenCalledWith({
      payload: 'React',
      type: 'dashboard/addDemandToDashboard',
    })
  })

  it('click cancel button to navigate to dashboard', async () => {
    await act(async () => {
      renderWithProviders(<DemandPage />)
    })
    fireEvent(
      screen.getByText(/cancel/i),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
  })
})

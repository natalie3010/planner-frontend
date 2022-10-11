import React from 'react'
import { act } from 'react-dom/test-utils'
import { screen, waitFor, fireEvent, within } from '@testing-library/react'
import { renderWithProviders } from '../../Utils/testSetup'
import { EditDemand } from '../EditDemand'
import { setupStore } from '../../store'
import { setupDashboard } from '../../Slices/DashboardSlice'
import { demandSchema } from '../../Validations/DemandValidation'
import format from '../../Data/Format'
import { updateDemand, getClients, getSkills, getSingleDemand } from '../../API'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ skillname: 'test-skill' }),
  // formIsValid is not coming from route params but it is being set by checkIfFormIsValid method. Remove this line of code
}))

jest.mock('../../Validations/DemandValidation', () => ({
  demandSchema: { isValid: jest.fn(() => Promise.resolve(true)) },
}))

// jest.mock('../../Data/Format', () => ({
//   formatSkills: jest.fn(() => [[{ SkillName: null, SkillsID: null }], null]),
//   formatClients: jest.fn(() => null),
//   demandFormFormatter: jest.fn(() => null),
// }))

jest.mock('../../API', () => ({
  getClients: jest.fn(() => Promise.resolve([{ ClientID: 'test-clients', ClientName: 'test-client-name' }])),
  getSingleDemand: jest.fn(() => Promise.resolve({ DemandStatus: 'test-single-demand', demandSkills: '1' })),
  getSkills: jest.fn(() =>
    Promise.resolve([
      { SkillName: 'test-skill', SkillsID: '1' },
      { SkillName: 'react', SkillsID: '2' },
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

// describe('Actions on EditDemand page', () => {
//   //Not sure this is needed, need further advice
//   it('test all inputdefaults on EditDemand', async () => {
//     await act(async () => {
//       renderWithProviders(<EditDemand />)
//     })
//     await waitFor(() => {
//       expect(screen.findByText('Code Requisition')).toBeDefined()
//       expect(screen.findByText('Start Date')).toBeDefined()
//       expect(screen.findByText('Client Name')).toBeDefined()
//       expect(screen.findByText('Originator')).toBeDefined()
//       expect(screen.findByText('Skill')).toBeDefined()
//       expect(screen.findByText('Probability')).toBeDefined()
//       expect(screen.findByText('Grade')).toBeDefined()
//       expect(screen.findByText('Selected Applicant')).toBeDefined()
//       expect(screen.findByText('Status')).toBeDefined()
//       expect(screen.findByText('Notes')).toBeDefined()
//       expect(screen.findByText('Proposed Applicant')).toBeDefined()
//       expect(screen.findByText('Creation Date')).toBeDefined()
//       expect(screen.findByText('Location')).toBeDefined()
//     })
//     screen.debug()
//     const submitButton = screen.getByRole('button', {
//       name: /submit/i,
//     })
//     await waitFor(() => {
//       fireEvent(
//         submitButton,
//         new MouseEvent('click', {
//           bubbles: true,
//           cancelable: true,
//         })
//       )
//       expect(updateDemand).toHaveBeenCalledTimes(0)
//     })
//   })

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

it.only('should call addDemandToDashboard if form data  is successfully submitted', async () => {
  updateDemand.mockImplementation(() => Promise.resolve({ SkillName: 'test-skill2', SkillsID: '1' }))

  const store = setupStore()
  store.dispatch(
    setupDashboard([
      { skill_name: 'test-skill', demand_count: 1 },
      { skill_name: 'react', demand_count: 1 },
    ])
  )
  //const state = { formIsValid: true, initialSkillName: 'skill-test', newskillname: 'one-test' }
  // store = setupStore(state)

  const originalDispatch = store.dispatch
  store.dispatch = jest.fn(originalDispatch)

  await act(async () => {
    renderWithProviders(<EditDemand />, { store }) // formIsValid is not part of state object but it is being set by checkIfFormIsValid method. Remove this line of code
  })

  fireEvent.input(screen.getByText('Code Requisition').nextSibling, {
    target: { value: 'test-code-requisition' },
  })

  screen.debug()
  const skillSelector = await screen.findByTestId('Skill')
  const clientNameSelector = await screen.findByTestId('Client Name')
  const skillButton = within(skillSelector).getByRole('button')
  const clientButton = within(clientNameSelector).getByRole('button')
  // await selectEvent.select(skillButton, ['test-skill'])

  await waitFor(() => {
    fireEvent(
      skillButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )
  })
  await waitFor(() => {
    fireEvent(
      clientButton,
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

  await waitFor(() => {
    fireEvent(
      clientButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )
  })

  const clientOption = await screen.findByRole('button', { name: /test-client-name/i })

  await waitFor(() => {
    fireEvent(
      clientOption,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )
  })
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
  it('click cancel with navigate to DemandPage', async () => {
    await act(async () => {
      renderWithProviders(<EditDemand />)
    })

    // screen.debug()
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
// })

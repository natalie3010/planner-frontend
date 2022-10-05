import React from 'react'
import { act } from 'react-dom/test-utils'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../../Utils/testSetup'
import { EditDemand } from '../EditDemand'
import format from '../../Data/Format'
import { updateDemand, getClients, getSkills, getSingleDemand } from '../../API'

const mockNavigate = jest.fn()
const mockUseParams = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => mockUseParams,
}))

// jest.mock('../../Data/Format', () => ({
//   formatSkills: jest.fn(() => [[{ SkillName: null, SkillsID: null }], null]),
//   formatClients: jest.fn(() => null),
//   demandFormFormatter: jest.fn(() => null),
// }))

jest.mock('../../API', () => ({
  getClients: jest.fn(() => Promise.resolve([{ ClientID: 'test-clients', ClientName: 'test-client-name' }])),
  getSingleDemand: jest.fn(() => Promise.resolve({ DemandStatus: 'test-single-demand', demandSkills: '1' })),
  getSkills: jest.fn(() => Promise.resolve([{ SkillName: 'test-skill', SkillsID: '1' }])),
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

describe('Actions on EditDemand page', () => {
  it('test all inputdefaults on EditDemand', async () => {
    await act(async () => {
      renderWithProviders(<EditDemand />)
    })
    await waitFor(() => {
      expect(screen.findByText('Code Requisition')).toBeDefined()
      expect(screen.findByText('Start Date')).toBeDefined()
      expect(screen.findByText('Client Name')).toBeDefined()
      expect(screen.findByText('Originator')).toBeDefined()
      expect(screen.findByText('Skill')).toBeDefined()
      expect(screen.findByText('Probability')).toBeDefined()
      expect(screen.findByText('Grade')).toBeDefined()
      expect(screen.findByText('Selected Applicant')).toBeDefined()
      expect(screen.findByText('Status')).toBeDefined()
      expect(screen.findByText('Notes')).toBeDefined()
      expect(screen.findByText('Proposed Applicant')).toBeDefined()
      expect(screen.findByText('Creation Date')).toBeDefined()
      expect(screen.findByText('Location')).toBeDefined()
    })
    screen.debug()
    const submitButton = screen.getByRole('button', {
      name: /submit/i,
    })
    await waitFor(() => {
      fireEvent(
        submitButton,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
      expect(updateDemand).toHaveBeenCalledTimes(0)
    })
  })

  describe('User action on components', () => {
    it.only('click cancel with navigate to DemandPage', async () => {
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

  // it.only('after editing some of the inputs the EditDemand should be different', async () => {
  //   await act(async () => {
  //     renderWithProviders(<EditDemand />)
  //   })
  //   const codeRequisitionLabel = screen.findByText('Code Requisition')
  //   const inputComponent = codeRequisitionLabel.nextSibling

  //   expect(codeRequisitionLabel).toBeDefined
  //   expect(inputComponent.value).toEqual('')
})
//   it('should return error if clicked on submit without formdata', async () => {
//     await act(async () => {
//       renderWithProviders(<EditDemand />)
//     })

//     console.log(await screen.findByText(/submit/i), 'Submit Button')

//     // await act(async () => {
//     //   renderWithProviders(<EditDemand />)
//     // })
//   })

// it('should call EditDemand if formdata submitted is true', async () => {
//   checkIfFormIsValid.mockImplementation(() => Promise.resolve(true))
//   await act(async () => {
//     renderWithProviders(<EditDemand />)
//   })
//   const input = (await screen.findByText()).nextSibling
//   console.log(input)
// })
//     new MouseEvent('click', {
//       bubbles: true,
//       cancelable: true,
//     })
//   )
//   await act(async () => {
//     renderWithProviders(<EditDemand />)
//   })
//   expect(updateDemand).toHaveBeenCalledTimes(1)
// })
/*
it('should call EditDemand if formdata submitted is true', async () => {
  checkIfFormIsValid.mockImplementation(() => Promise.resolve(false))
  await act(async () => {
    renderWithProviders(<EditDemand />)
  })
  fireEvent(
    screen.findByText(/submit/i),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )
  await act(async () => {
    renderWithProviders(<EditDemand />)
  })
  expect(updateDemand).toHaveBeenCalledTimes(1)
})

it('after editing some of the inputs the EditDemand should be different', async () => {
  checkIfFormIsValid.mockImplementation(() => Promise.resolve(false))
  await act(async () => {
    renderWithProviders(<EditDemand />)
  })
  fireEvent.input(screen.findByText('Code Requisition').nextSibling, {
    target: { value: 'test-code-requisition' },
  })
  fireEvent(
    screen.findByText(/submit/i),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )
  await act(async () => {
    renderWithProviders(<EditDemand />)
  })
  expect(updateDemand).toHaveBeenCalledTimes(1)
})
 */

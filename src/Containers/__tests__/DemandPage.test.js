import React from 'react'
import { act } from 'react-dom/test-utils'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../../Utils/testSetup'
import { DemandPage } from '../DemandPage'
import { addDemand } from '../../API'
import { addDemandToDashboard } from '../../Slices/DashboardSlice'
import { checkIfFormIsValid } from '../../Utils/util'
import { setupStore } from '../../store'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

jest.mock('../../Slices/DashboardSlice', () => ({
  addDemandToDashboard: jest.fn(),
}))

jest.mock('../../Utils/util', () => ({
  checkIfFormIsValid: jest.fn(),
}))

jest.mock('../../API', () => ({
  getClients: jest.fn(() => Promise.resolve([{ ClientID: 'test-clients', ClientName: 'test-client-name' }])),
  getSkills: jest.fn(() => Promise.resolve([{ SkillName: 'test-skill', SkillsID: '1' }])),
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
  })


  describe('Actions on DemandPage page', () => {
    it('test all inputdefaults on DemandPage', async () => {
      checkIfFormIsValid.mockImplementation(() => Promise.resolve(false))
      addDemand.mockImplementation(() => Promise.resolve(null))
      await act(async () => {
        renderWithProviders(<DemandPage />)
      })
      await waitFor(() => {
        expect(screen.getByText('Code Requisition')).toBeDefined()
        expect(screen.getByText('Client Name')).toBeDefined()
        expect(screen.getByText('Start date')).toBeDefined()
        expect(screen.getByText('Originator')).toBeDefined()
        expect(screen.getByText('Skill')).toBeDefined()
        expect(screen.getByText('Probability')).toBeDefined()
        expect(screen.getByText('Grade')).toBeDefined()
        expect(screen.getByText('Selected Applicant')).toBeDefined()
        expect(screen.getByText('Status')).toBeDefined()
        expect(screen.getByText('Notes')).toBeDefined()
        expect(screen.getByText('Proposed Applicant')).toBeDefined()
        expect(screen.getByText('Creation date')).toBeDefined()
        expect(screen.getByText('Location')).toBeDefined()
      })
    })

    it('should return error if clicked on submit without formdata', async () => {
      checkIfFormIsValid.mockImplementation(() => Promise.resolve(false))
      addDemand.mockImplementation(() => Promise.resolve(null))
      await act(async () => {
        renderWithProviders(<DemandPage/>)
      })
        fireEvent(
          screen.getByText(/submit/i),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        )
    
      await act(async () => {
        renderWithProviders(<DemandPage />)
      })
      expect(addDemand).toHaveBeenCalledTimes(0)
    })
 

  it('test that user sholud be able to type into inputs ', async () => {
    await act(async () => {
      renderWithProviders(<DemandPage />)
    })
 
      fireEvent.change(screen.getByText('Code Requisition').nextSibling, {
        target: { value: 'test-code-requisition' },
      })
      expect(screen.getByText('Code Requisition').nextSibling.value).toEqual('test-code-requisition')

      fireEvent.change(screen.getByText('Client Name'))
      expect(screen.getByText('Client Name')).toBeDefined

      fireEvent.change(screen.getByRole('button', { name: /select a client/i }))
      expect(screen.getByRole('button', { name: /select a client/i })).toBeDefined

      fireEvent.change(screen.getByText('Start date').nextSibling, {
        target: { value: '01/01/2021' },
      })
      expect(screen.getByText('Start date').nextSibling.value).toEqual('01/01/2021')

      fireEvent.change(screen.getByText('Originator').nextSibling, {
        target: { value: 'test-originator' },
      })
      expect(screen.getByText('Originator').nextSibling.value).toEqual('test-originator')

      fireEvent.change(screen.getByText('Skill'))
      expect(screen.getByText('Skill')).toBeDefined

      fireEvent.change(screen.getByRole('button', { name: /select a skill/i }))
      expect(screen.getByRole('button', { name: /select a skill/i })).toBeDefined

      fireEvent.change(screen.getByText('Probability').nextSibling, {
        target: { value: 'test-probability' },
      })
      expect(screen.getByText('Probability').nextSibling.value).toEqual('test-probability')

      fireEvent.change(screen.getByText('Grade'))
      expect(screen.getByText('Grade')).toBeDefined

      fireEvent.change(screen.getByRole('button', { name: /select a grade/i }))
      expect(screen.getByRole('button', { name: /select a grade/i })).toBeDefined

      fireEvent.change(screen.getByText('Selected Applicant').nextSibling, {
        target: { value: 'test-selected-applicant' },
      })
      expect(screen.getByText('Selected Applicant').nextSibling.value).toEqual('test-selected-applicant')

      fireEvent.change(screen.getByText('Status'))
      expect(screen.getByText('Status')).toBeDefined

      fireEvent.change(screen.getByRole('button', { name: /select a status/i }))
      expect(screen.getByRole('button', { name: /select a status/i })).toBeDefined

      fireEvent.change(screen.getByText('Notes').nextSibling, {
        target: { value: 'test-notes' },
      })
      expect(screen.getByText('Notes').nextSibling.value).toEqual('test-notes')

      fireEvent.change(screen.getByText('Proposed Applicant').nextSibling, {
        target: { value: 'test-proposed-applicant' },
      })
      expect(screen.getByText('Proposed Applicant').nextSibling.value).toEqual('test-proposed-applicant')

      fireEvent.change(screen.getByText('Creation date').nextSibling, {
        target: { value: '01/01/2021' },
      })
      expect(screen.getByText('Creation date').nextSibling.value).toEqual('01/01/2021')

      fireEvent.change(screen.getByText('Location').nextSibling, {
        target: { value: 'test-location' },
      })
      expect(screen.getByText('Location').nextSibling.value).toEqual('test-location')
    

   
  })
  it('should call addDemand if formdata submitted is true', async () => {
    checkIfFormIsValid.mockImplementation(() => Promise.resolve(true))
    addDemand.mockImplementation(() => Promise.resolve(null))
    await act(async() => {
      renderWithProviders(<DemandPage />)
    })
    fireEvent(
      screen.getByText(/submit/i),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )
    await act(async () => {
      renderWithProviders(<DemandPage />)
    })
    expect(addDemand).toHaveBeenCalledTimes(1)
  })


it('after giving all inputs the new demand should be added to dashboard ', async () => {
    checkIfFormIsValid.mockImplementation(() => Promise.resolve(true))
    addDemand.mockImplementation(() => Promise.resolve(true))

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
    await act(async () => {
      renderWithProviders(<DemandPage />)
    })
    expect(addDemandToDashboard).toHaveBeenCalledTimes(1)
  })
})


describe('test submit and cancel buttons on Demand Page', () => {
  // it('if addDemand is true navigate to dashboard', async () => {
  //   addDemand.mockImplementation(() => Promise.resolve(true))
  //   checkIfFormIsValid.mockImplementation(() => Promise.resolve(true))
  //   await act(async () => {
  //     renderWithProviders(<DemandPage />)
  //   })
  //   fireEvent(
  //     screen.getByText(/submit/i),
  //     new MouseEvent('click', {
  //       bubbles: true,
  //       cancelable: true,
  //     })
  //   )
  //   await act(async () => {
  //     renderWithProviders(<DemandPage />)
  //   })
  //   expect(mockNavigate).toHaveBeenCalledWith('/protectedRoute/dashboard')
  // })

  it('test cancel button to navigate to dashboard', async () => {
    await act(async () => {
      renderWithProviders(<DemandPage />)
    })
    fireEvent(
      screen.getByText('cancel'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )
    expect(mockNavigate).toHaveBeenCalledWith('/protectedRoute/dashboard')
  })
})

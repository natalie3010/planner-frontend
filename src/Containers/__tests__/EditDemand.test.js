import React from 'react'
import { act } from 'react-dom/test-utils'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../../Utils/testSetup'
import { EditDemand } from '../EditDemand'
import format from '../../Data/Format'

const mockNavigate = jest.fn()
const mockUseParams = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => mockUseParams,
}))

jest.mock('../../Data/Format', () => ({
  formatSkills: jest.fn(() => [[{ skillName: null, SkillsID: null }], null]),
  formatClients: jest.fn(() => null),
  demandFormFormatter: jest.fn(() => null),
}))

jest.mock('../../API', () => ({
  getClients: jest.fn(() => Promise.resolve([{ ClientID: 'test-clients', ClientName: 'test-client-name' }])),
  getSingleDemand: jest.fn(() => Promise.resolve({ DemandStatus: 'test-single-demand' })),
  getSkills: jest.fn(() => Promise.resolve([{ skillName: 'test-skill', SkillsID: '1' }])),
  updateDemand: jest.fn(() => Promise.resolve(true)),
}))

describe('Testing <EditDemand/> component', () => {
  describe('Different stages of EditDemand component', () => {
    it('should display "loading" initially', async () => {
      act(() => {
        renderWithProviders(<EditDemand />, {
          preloadedState: {
            user: { authToken: 'test-token' },
          },
        })
      })
      expect(
        await waitFor(() => {
          screen.getByText('loading...', { exact: false })
        })
      ).toBeInTheDocument
    })

    //     describe('Actions on EditDemand page', () => {
    //       it('should call handleSubmit function on submit', async () => {
    //         await act(async () => {
    //           renderWithProviders(<EditDemand />)
    //         })
    //         fireEvent(
    //           screen.getByText('submit'),
    //           new MouseEvent('click', {
    //             bubbles: true,
    //             cancelable: true,
    //           })
    //         )
    //         expect(mockNavigate).toHaveBeenCalledTimes(1)
    //       })

    //       it('should test cancel button', async () => {
    //         await act(async () => {
    //           renderWithProviders(<EditDemand />, {
    //             preloadedState: {
    //               user: { authToken: 'test-token' },
    //             },
    //           })
    //         })
    //         fireEvent(
    //           screen.getByText(/cancel/i),
    //           new MouseEvent('click', {
    //             bubbles: true,
    //             cancelable: true,
    //           })
    //         )
    //         expect(mockNavigate).toHaveBeenCalledWith('/list-Demand')
    //       })
    //     })
  })
})

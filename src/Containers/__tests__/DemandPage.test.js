import React from 'react'
import { act } from 'react-dom/test-utils'
import { screen, waitFor, fireEvent, userEvent } from '@testing-library/react'
import { renderWithProviders } from '../../Utils/testSetup'
import { DemandPage } from '../DemandPage'
import { addDemandToDashboard } from '../../Slices/DashboardSlice'
import { demandForm } from '../../Data/Data'
import { demandFormFormatter } from '../../Data/Format'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

jest.mock('../../Data/Format', () => ({
  formatSkills: jest.fn(() => [null, [{ skillName: null, SkillsID: null }], null]),
  formatClients: jest.fn(() => null),
  demandFormFormatter: jest.fn(() => null),
}))

jest.mock('../../Slices/DashboardSlice', () => ({
  addDemandToDashboard: jest.fn(),
}))

jest.mock('../../API', () => ({
  getClients: jest.fn(() => Promise.resolve([{ ClientID: 'test-clients', ClientName: 'test-client-name' }])),
  getSkills: jest.fn(() => Promise.resolve([{ skillName: 'test-skill', SkillsID: '1' }])),
  addDemand: jest.fn(() => Promise.resolve(true)),
}))

jest.mock('../../Data/Data', () => ({
  demandForm: jest.fn(() => null),
}))


describe('Testing <DemandPage/> component', () => {
  describe('Different stages of DemandPage component', () => {
    it('should display "loading" initially', async () => {
     act(() => {
        renderWithProviders(<DemandPage />)
      })
      expect(
        await waitFor(() => {
          screen.getByText("loading...", { exact: false })
        })
      ).toBeInTheDocument
    })
    it('should display "Add a new demand" after successfully loaded', async () => {
      await act(async () => {
        renderWithProviders(<DemandPage />)
      })
      expect(
        await waitFor(() => {
          screen.findByText("Add a new demand", { exact: false })
        })
      ).toBeInTheDocument
    })
  })
})



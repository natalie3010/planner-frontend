import React from 'react'
import { screen, fireEvent, waitFor, within } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { renderWithProviders } from '../../Utils/testSetup'
import { ListClients } from '../ListClients'
import { getClients, postClient, putClient } from '../../API'
import { setupStore } from '../../store'
import { setupClients } from '../../Slices/DashboardSlice'
import { clientSchema } from '../../Validations/ListClientsValidation'
import { useSelector } from 'react-redux'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

jest.mock('../../API', () => ({
  getClients: jest.fn(() => Promise.resolve(true)),
  postClient: jest.fn(() => Promise.resolve(true)),
  putClient: jest.fn(() => Promise.resolve(true)),
}))

jest.mock('../../Validations/ListClientsValidation', () => ({
  clientSchema: { isValid: jest.fn(() => Promise.resolve(true)) },
}))

describe('Testing <ListClients/> component', () => {
  it('should display Loading initially', async () => {
    getClients.mockImplementation(() => Promise.resolve(null))
    act(() => {
      renderWithProviders(<ListClients />)
    })
    expect(
      await waitFor(() => {
        screen.getByText('Loading...', { exact: false })
      })
    ).toBeInTheDocument
  })

  it('should display "Clients List" after successfully loaded', async () => {
    act(() => {
      renderWithProviders(<ListClients />)
    })
    expect(
      await waitFor(() => {
        screen.getByText('Clients List', { exact: false })
      })
    ).toBeInTheDocument
  })

  it('should display all clients after successfully loaded', async () => {
    getClients.mockImplementation(() => Promise.resolve([{ id: 'test-clients', name: 'test-client-name' }]))
    clientSchema.isValid.mockReturnValue(false)

    act(() => {
      renderWithProviders(<ListClients />)
    })
    expect(screen.getByText(/ClientName/i)).toBeInTheDocument

    expect(
      await waitFor(() => {
        screen.getByText('test-client-name')
      })
    ).toBeInTheDocument
  })

  it('should not add new client if validation fails', async () => {
    clientSchema.isValid.mockReturnValue(false)
    act(() => {
      renderWithProviders(<ListClients />)
    })
    fireEvent(
      screen.getByRole('button', { name: 'Add' }),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )
    expect(postClient).not.toHaveBeenCalled
  })

  it('should call addclient when new clientdata is submitted', async () => {
    getClients.mockImplementation(() => Promise.resolve([{ id: 'test-clients1', name: 'test-client-name1' }]))
    clientSchema.isValid.mockReturnValue(true)
    postClient.mockImplementation(() =>
      Promise.resolve([{ client: { id: 'test-clients1', name: 'test-client-name1' } }])
    )

    const store = setupStore()
    store.dispatch(setupClients([{ id: 'test-clients1', name: 'test-client-name1' }]))

    const clientDispatch = store.dispatch
    store.dispatch = jest.fn(clientDispatch)

    act(() => {
      renderWithProviders(<ListClients />, { store })
    })

    fireEvent.input(screen.getByPlaceholderText('Add Client Id'), { target: { value: 'test-clients1' } })
    fireEvent.input(screen.getByPlaceholderText('Add Client Name'), { target: { value: 'test-client-name1' } })

    expect(screen.getByPlaceholderText('Add Client Id').value).toBe('test-clients1')
    expect(screen.getByPlaceholderText('Add Client Name').value).toBe('test-client-name1')

    fireEvent(
      screen.getByRole('button', { name: 'Add' }),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )

    expect(screen.getByDisplayValue('test-client-name1')).toBeInTheDocument

    expect(await waitFor(() => postClient)).toHaveBeenCalledWith({
      client: { id: 'test-clients1', name: 'test-client-name1' },
    })

    expect(store.dispatch).toHaveBeenCalledWith({
      payload: [{ id: 'test-clients1', name: 'test-client-name1' }],
      type: 'dashboard/setupClients',
    })
  })

  it('should update clients when response is success', async () => {
    getClients.mockImplementation(() => Promise.resolve([{ id: 'test-clients1', name: 'test-client-name1' }]))
    clientSchema.isValid.mockReturnValue(true)
    postClient.mockImplementation(() => Promise.resolve({ status: 200 }))

    const store = setupStore()
    store.dispatch(setupClients([{ name: 'test-client-name1' }]))

    const clientDispatch = store.dispatch
    store.dispatch = jest.fn(clientDispatch)

    act(() => {
      renderWithProviders(<ListClients />, { store })
    })

    fireEvent.input(screen.getByPlaceholderText('Add Client Name'), { target: { value: 'test-client-name1' } })

    expect(
      await waitFor(() => {
        screen.getByText('test-client-name1')
      })
    ).toBeInTheDocument

    fireEvent(
      screen.getByRole('button', { name: 'Add' }),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )

    expect(store.dispatch).toHaveBeenCalledWith({
      payload: [{ id: 'test-clients1', name: 'test-client-name1' }],
      type: 'dashboard/setupClients',
    })
  })

 

  it('should edit client when edit button is clicked', async () => {
    getClients.mockImplementation(() => Promise.resolve([{ id: 'test-clients2', name: 'test-client-name2' }]))
    putClient.mockImplementation(() =>
      Promise.resolve('test-clients', { client: { id: 'test-clients', name: 'test-client-name' } })
    )

    const store = setupStore()
    store.dispatch(setupClients([{ id: 'test-clients2', name: 'test-client-name2' }]))

    const updateDispatch = store.dispatch
    store.dispatch = jest.fn(updateDispatch)

    act(() => {
      renderWithProviders(<ListClients />, { store })
    })

    const row = screen.getAllByRole('row')[1]

    const editButton = within(row).getAllByRole('cell')[1]

    const nameInput = within(row).getAllByRole('cell')[0]
    expect(nameInput).toBeInTheDocument

    fireEvent(
      editButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )

    const nameInput1 = within(row).getAllByRole('textbox')[0]

    fireEvent.input(nameInput1, { target: { value: 'test-client-name2' } })
    expect(nameInput1.value).toBe('test-client-name2')

    fireEvent(
      editButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )
    expect(putClient).toHaveBeenCalledWith('test-clients2', {
      client: { id: 'test-clients2', name: 'test-client-name2' },
    })

    expect(await waitFor(() => store.dispatch)).toHaveBeenCalledWith({
      payload: [{ id: 'test-clients2', name: 'test-client-name2' }],
      type: 'dashboard/setupClients',
    })

    expect(screen.getByDisplayValue('test-client-name2')).toBeInTheDocument

  })
    
  it('should navigate to dashboard page on clicking "Dashboard" button', async () => {
    act(() => {
      renderWithProviders(<ListClients />)
    })

    fireEvent(
      screen.getByText(/Dashboard/i),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
  })
})

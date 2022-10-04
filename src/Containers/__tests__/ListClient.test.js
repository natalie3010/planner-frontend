import React from 'react'
import { act } from 'react-dom/test-utils'
import { renderWithProviders } from '../../Utils/testSetup'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import { ListClients } from '../ListClients'
import { getClients, postClient } from '../../API'
import { prefetch } from 'webpack'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

jest.mock('../../API', () => ({
  getClients: jest.fn(() => Promise.resolve([{ clientData: 'clientData' }])),
  postClient: jest.fn(),
 // putClient: jest.fn(() => Promise.resolve(null)),
}))

//jest.mock('../ListClients')

// const mockSetClientIndex = jest.fn()
// jest.mock("../ListClients", () => {
//     return jest.fn().mockImplementation(() => {
//         return {
//             setClientIndex: () => {mockSetClientIndex()},
//         }
//     })
// })

describe('<ListClients/> component', () => {
  it('should show Loading if clientData is null', async () => {
    getClients.mockImplementationOnce(() => Promise.resolve(null))
    await act(async () => {
      renderWithProviders(<ListClients />)
    })
    expect(screen.getByText('Loading...')).toBeInTheDocument
  })

  it('should display Clients List if page loaded successfully', async () => {
    await act(async () => {
      renderWithProviders(<ListClients />)
    })
    expect(screen.getByText('Clients List')).toBeInTheDocument
  })

  it('should display dashboard button if page loaded successfully', async () => {
    await act(async () => {
      renderWithProviders(<ListClients />)
    })
    fireEvent(
      screen.getByText('Dashboard'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )
    expect(mockNavigate).toHaveBeenCalledWith('/protectedRoute/dashboard')
  })
  it('should display clientname in table after api request', async () => {
    getClients.mockImplementation(() => Promise.resolve([{ clientName: 'clientName' }]))
    await act(async () => {
      renderWithProviders(<ListClients />)
    })
    await waitFor(() => {
      expect(getClients).toHaveBeenCalled()
    })
    expect(screen.getByText('Client Name')).toBeInTheDocument
  })
  
   it('should add new client', async () => {
    postClient.mockImplementation(() => Promise.resolve(true))
    await act(async () => {
        renderWithProviders(<ListClients />)
    })
      const clientName = screen.getByTestId('clientName')
      const clientId= screen.getByTestId('clientID')

    fireEvent.change(clientName, { target: { value: 'clientName' } })
    fireEvent.change(clientId, { target: { value: 'clientId' } })

    const addClientButton = screen.getByText('AddClient')
    fireEvent.click(addClientButton)

    await waitFor(() => {
        expect(postClient).toHaveBeenCalledTimes(1)
    })
    })
})







    //     it('should set clientindex after clicking on clientname', async() => {
  //         getClients.mockImplementationOnce(() => Promise.resolve([{clientName: "clientName"}]));
  //         await act(async () => {
  //         renderWithProviders(<ListClients />)
  //         })
  //         await waitFor(() => {
  //             fireEvent(
  //                 screen.getByText('Client Name'),
  //                 new MouseEvent('click', {
  //                     bubbles: true,
  //                     cancelable: true,
  //                 })

  //             )
  //             expect(mockSetClientIndex).toHaveBeenCalledWith(0)
  //         })

  // })


/*describe('User should be able to addclient', () => {
  it('test the input fields first', async () => {
    await act(async () => {
      renderWithProviders(<ListClients />)
    })
    await waitFor(() => {
      expect(screen.getByTestId('clientID')).toBeDefined()
      expect(screen.getByTestId('clientName')).toBeDefined()
    })
  })
  it('should test when user enters input', async () => {
    // checkIfFormIsValid.mockImplementation(() => true);
    // postClient.mockImplementation(() => Promise.resolve({ClientName: "clientData", ClientID: "clientData"}));
    await act(async () => {
      renderWithProviders(<ListClients />, {
        preloadedState: {
          user: { authToken: 'test-token' },
        },
      })
    })
    await waitFor(() => {
      fireEvent.change(screen.getByTestId('clientID'), { target: { value: 'test' } })
      fireEvent.change(screen.getByTestId('clientName'), { target: { value: 'test' } })
      expect(screen.getByTestId('clientID').value).toBe('test')
      expect(screen.getByTestId('clientName').value).toBe('test')
    })
  })
  it('should call postClient when user clicks on add client button', async () => {
    postClient.mockImplementation(() => Promise.resolve(true))
    await act(async () => {
      renderWithProviders(<ListClients />, {
        preloadedState: {
          user: { authToken: 'test-token' },
        },
      })
    })
    fireEvent(
      screen.getByText('AddClient'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    )
    await act(async () => {
        renderWithProviders(<ListClients />)
    })
   
    expect(postClient).toHaveBeenCalled()
  })
})*/
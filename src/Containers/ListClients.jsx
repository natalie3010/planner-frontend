import React, { useEffect, useState } from 'react'
import { CG } from 'cap-shared-components'
import { Col } from 'react-grid-system'

import { useNavigate, useParams } from 'react-router-dom'
import { getClients, postClient, putClient } from '../API'
import { useSelector, useDispatch } from 'react-redux'
import { formatClients, clientFormFormatter } from '../Data/Format'
import { clientForm as form } from '../Data/Data'
import { removeClient, setupClients } from '../Slices/DashboardSlice'
import { clientSchema } from '../Validations/ListClientsValidation'

export const ListClients = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const authToken = useSelector((state) => state.user.authToken)
  const clientData = useSelector((state) => state.dashboard.clientData)

  const inputDefaults = clientFormFormatter()

  const [data, setData] = useState([form])
  const [formSubmitted, setFormSubmitted] = useState(false)

  const [ClientID, setClientID] = useState()
  const [ClientName, setClientName] = useState()

  const requestObject2 = { method: 'DELETE', headers: { 'x-access-token': authToken } }

  useEffect(() => {
    const requestClients = getClients(authToken)

    requestClients.then((clientResult) => {
      console.log(clientResult)
      dispatch(setupClients(clientResult))
      setData(clientResult)
    })
  }, [])

  const addClient = async () => {
    setFormSubmitted(true)
    const data = { ClientID: ClientID, ClientName: ClientName }
    const isFormValid = await checkIfFormIsValid()
    console.log(isFormValid)
    if (isFormValid) {
      postClient(authToken, data)
      refreshPage()
    }
  }

  //This is for  Add button to refresh
  const refreshPage = () => {
    window.location.reload(false)
  }

  const deleterow = (ClientID) => {
    let url = `https://localhost:4001/api/clients/${ClientID}`
    fetch(url, requestObject2).then(() => {
      dispatch(removeClient(ClientID))
    })
  }

  const editClient = async () => {
    const data = { ClientName: ClientName }
    const response = await putClient(authToken, ClientID, data)
    console.log('res', response)
  }

  const checkIfFormIsValid = async () => {
    return clientSchema.isValid({ clientID: ClientID, clientName: ClientName })
  }

  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box ml='15px' mr='15px' mt='10px' display='flex' flexDirection='row' justifyContent='space-between'>
        <CG.Heading size='XS'>Clients List</CG.Heading>
        <CG.Button primary text='Dashboard' onClick={() => navigate('/protectedRoute/dashboard')}></CG.Button>
      </CG.Box>
      <CG.Box
        width='70rem'
        p='0.95rem'
        m='10px'
        display='flex'
        alignContent='center'
        flexDirection='column'
        boxSizing='border-box'
        fontSize='0.90rem'
      >
        <CG.Box
          width='50%'
          justifyContent='space-between'
          ml='600px'
          mr='15px'
          mt='10px'
          display='flex'
          flexDirection='row'
          height='30px'
        >
          <CG.Input
            id='clientID'
            label='Add'
            name='clientID'
            placeholder='Add Client Id'
            topLabel={false}
            onInput={(e) => {
              setClientID(e.target.value)
            }}
            required={inputDefaults['clientID'].validators[0].required}
            hasError={inputDefaults['clientID'].validators[0].required && !clientData['clientID'] && formSubmitted}
          />
          <CG.Input
            id='clientName'
            name='clientName'
            placeholder='Add Client Name'
            topLabel={false}
            onInput={(e) => {
              setClientName(e.target.value)
            }}
            required={inputDefaults['clientName'].validators[0].required}
            hasError={inputDefaults['clientName'].validators[0].required && !clientData['clientName'] && formSubmitted}
          />
          <CG.Button
            primary
            text='Add'
            onClick={() => {
              addClient()
            }}
          />
        </CG.Box>

        <CG.Box
          width='50%'
          justifyContent='space-between'
          ml='600px'
          mr='15px'
          mt='10px'
          display='flex'
          flexDirection='row'
          height='30px'
        >
          {ClientName && (
            <>
              <CG.Input
                label='Edit'
                topLabel={false}
                initValue={ClientName}
                onInput={(e) => {
                  setClientName(e.target.value)
                }}
              />
              <CG.Button
                primary
                text='Edit'
                onClick={() => {
                  editClient()
                  refreshPage()
                }}
              />
            </>
          )}
        </CG.Box>

        <CG.Table
          customKeyNames={{
            ClientID: 'Client ID',
            ClientName: 'Client Name',
          }}
          data={clientData}
          divider
          selectedKeys={['ClientID', 'ClientName']}
          icons={[
            {
              tableHeader: 'Edit',
              height: '0.90rem',
              width: '0.90rem',
              type: 'Edit2',
              handler: (value) => {
                setClientName(value.ClientName)
                setClientID(value.ClientID)
              },
            },
            /* {
              tableHeader: 'Delete',
              height: '0.90rem',
              width: '0.90rem',
              type: 'X',
              handler: (value) => deleterow(value.ClientID),
            }, */
          ]}
        />
      </CG.Box>
    </Col>
  )
}

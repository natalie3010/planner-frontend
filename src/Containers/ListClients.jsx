import React, { useEffect, useState } from 'react'
import { CG } from 'cap-shared-components'
import { Col } from 'react-grid-system'
import { useNavigate } from 'react-router-dom'
import { getClients, postClient, putClient } from '../API'
import { useSelector, useDispatch } from 'react-redux'
import { setupClients } from '../Slices/DashboardSlice'
import { formatClients, clientFormFormatter } from '../Data/Format'
import { clientSchema } from '../Validations/ListClientsValidation'

export const ListClients = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.user.authToken)
  const clientData = useSelector((state) => state.dashboard.clientData)
  const [ClientID, setClientID] = useState(null)
  const [ClientName, setClientName] = useState(null)
  const [clientsUpdated, setClientsUpdated] = useState(false)
  const [editClientIndex, setEditClientIndex] = useState(null)
  const [editClientName, setEditClientName] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const inputDefaults = clientFormFormatter()

  useEffect(() => {
    const requestClients = getClients(authToken)
    requestClients.then((clientResult) => {
      dispatch(setupClients(clientResult))
    })
  }, [clientsUpdated, formSubmitted])

  const addClient = async () => {
    setFormSubmitted(!clientsUpdated)
    const isFormValid = await checkIfFormIsValid()
    if (isFormValid) {
      const response = await postClient(authToken, { ClientID, ClientName })
      if (response.status === 200) {
        setClientsUpdated(!clientsUpdated)
      }
    }
  }

  const editClient = async (clientId) => {
    const response = await putClient(authToken, clientId, { ClientName: editClientName })
    if (response.changes === 1) {
      setClientsUpdated(!clientsUpdated)
      setEditClientIndex(null)
    }
  }

  const checkIfFormIsValid = async () => {
    return clientSchema.isValid({ clientID: ClientID, clientName: ClientName })
  }

  const setClientIndex = (clientId) => {
    const clientIndex = clientData.findIndex((object) => {
      return object.ClientID === clientId
    })
    /**
     * Changed index to string as index 0 doesn't work
     * index is an interger
     */
    setEditClientIndex(clientIndex.toString())
  }
  if (!clientData) {
    return <>Loading...</>
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

        <CG.Table
          customKeyNames={{
            ClientName: 'Client Name',
          }}
          data={clientData}
          divider
          selectedKeys={['ClientName']}
          icons={[
            {
              tableHeader: 'Edit',
              height: '0.90rem',
              width: '0.90rem',
              type: 'Edit2',
              handler: (value) => {
                if (editClientIndex && value.ClientID === clientData[editClientIndex].ClientID) {
                  editClient(value.ClientID)
                }
                setClientIndex(value.ClientID)
              },
            },
          ]}
          editable
          editableColumn='0'
          editableRow={editClientIndex}
          editChanged={(val) => {
            setEditClientName(val)
          }}
        />
      </CG.Box>
    </Col>
  )
}

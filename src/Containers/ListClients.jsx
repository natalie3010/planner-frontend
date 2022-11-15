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
  const clientData = useSelector((state) => state.dashboard.clientData)
  const [ClientID, setClientID] = useState(null)
  const [ClientName, setClientName] = useState(null)
  const [clientsUpdated, setClientsUpdated] = useState(false)
  const [editClientIndex, setEditClientIndex] = useState(null)
  const [editClientName, setEditClientName] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const inputDefaults = clientFormFormatter()

  useEffect(() => {
    const requestClients = getClients()
    requestClients.then((clientResult) => {
      dispatch(setupClients(clientResult))
    })
  }, [clientsUpdated, formSubmitted])

  const addClient = async () => {
    setFormSubmitted(!clientsUpdated)
    const client = { client: { id: ClientID, name: ClientName } }
    const isFormValid = await checkIfFormIsValid() 
    if (isFormValid) {
      const response = await postClient(client)
      if (response.status === 200) {
        setClientsUpdated(!clientsUpdated)
      }
    }
  }

  const editClient = async (clientId) => {
    if (clientId && editClientName) {
      const response = await putClient(clientId, { client: { id: clientId, name: editClientName } })
    if (response) {
        setClientsUpdated(!clientsUpdated)
      }
      setEditClientIndex(null)
      setEditClientName(null)
    }
  }

  const checkIfFormIsValid = () => {
    const isValid = clientSchema.isValid({ id: ClientID, name: ClientName })
    return isValid
    
  }
    

  if (!clientData) {
    return <>Loading...</>
  }
  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box ml='15px' mr='15px' mt='10px' display='flex' flexDirection='row' justifyContent='space-between'>
        <CG.Heading size='XS'>Clients List</CG.Heading>
        <CG.Button primary text='Dashboard' onClick={() => navigate('/dashboard')}></CG.Button>
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
            id='id'
            label='Add'
            name='id'
            placeholder='Add Client Id'
            topLabel={false}
            onInput={(e) => {
              setClientID(e.target.value)
            }}
            required={inputDefaults['id'].validators[0].required}
            hasError={inputDefaults['id'].validators[0].required && !clientData['id'] && formSubmitted}
          />
          <CG.Input
            id='clientName'
            name='clientName'
            placeholder='Add Client Name'
            topLabel={false}
            onInput={(e) => {
              setClientName(e.target.value)
            }}
            required={inputDefaults['name'].validators[0].required}
            hasError={inputDefaults['name'].validators[0].required && !clientData['name'] && formSubmitted}
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
            name: 'ClientName',
          }}
          data={clientData}
          divider
          selectedKeys={['name']}
          icons={[
            {
              tableHeader: 'Edit',
              height: '0.90rem',
              width: '0.90rem',
              type: 'Edit2',
              handler: (value) => {
                const index = clientData.findIndex((data) => data.id === value.id)
                setEditClientName(null)
                setEditClientIndex(index + '')
                if (index >= 0) {
                  setEditClientName(value.name)
                  editClient(value.id)
                }
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

import React, { useEffect, useState } from 'react'
import { CG } from 'cap-shared-components'
import { Col } from 'react-grid-system'

import { useNavigate, useParams } from 'react-router-dom'
import { getClients, postClient } from '../API'
import { useSelector, useDispatch } from 'react-redux'
import { formatClients } from '../Data/Format'
import { clientForm as form } from '../Data/Data'
import { removeClient, setupClients } from '../Slices/DashboardSlice'

export const ListClients =() =>{
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const authToken = useSelector((state) => state.user.authToken)
  const clientData = useSelector((state) => state.dashboard.clientData)

  const [data, setData] = useState([form])

  const [ClientID, setClientID] = useState()
  const [ClientName, setClientName] = useState()

  const requestObject2 = { method: 'DELETE', headers: { 'x-access-token': authToken } }

  const handleSubmit = (e) => {
    setFormSubmitted(true)
    const data = {
      ClientID: formData.supplyFName,
      tLastName: formData.supplyLName,
    }
  }

  useEffect(() => {
    const requestClients = getClients(authToken)
    
    requestClients.then((clientResult) => { 
      console.log(clientResult);
      dispatch(setupClients(clientResult));
      setData(clientResult)
  })
  
  }, [])

  const addClient = () => {
    const data={ClientID: ClientID, ClientName: ClientName}
    postClient(authToken, data)
  }

  //This is for  Add button to refresh
  const refreshPage= () => {
    window.location.reload(false);
  }

  const deleterow = (ClientID) => {
    let url = `https://localhost:4001/api/clients/${ClientID}`
    fetch(url, requestObject2).then(() => {
      dispatch(removeClient(ClientID))
    })
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
        
        <CG.Box width="50%" justifyContent="space-between" ml='600px' mr='15px' mt='10px'  display='flex' flexDirection='row' height='30px'  >
        <CG.Input 
  id="textInput"
  label="Add Clients"
  name="textInput"
  placeholder="Add Client Id"
  topLabel={false}
  onInput = {(e) => {setClientID(e.target.value)}} />
        <CG.Input 
  id="textInput"
  name="textInput"
  placeholder="Add Client Name"
  topLabel={false}
  onInput = {(e) => {setClientName(e.target.value)}} />
        <CG.Button
  primary
  text="Add"
  onClick={() => {
    addClient()
    refreshPage()
  }}
/>
        
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
                dispatch(selectApplicantID(value.ApplicantID))
                navigate('/edit-client')
              },
            },
            {
              tableHeader: 'Delete',
              height: '0.90rem',
              width: '0.90rem',
              type: 'X',
              handler: (value) => deleterow(value.ClientID),
            },
          ]}
        />
        
      </CG.Box>
    </Col>
    
  )


}

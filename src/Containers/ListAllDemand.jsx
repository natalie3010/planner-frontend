import React, { useEffect, useState } from 'react'
import { CG } from 'cap-shared-components'
import { Col } from 'react-grid-system'

import { useNavigate, useParams } from 'react-router-dom'
import { getClients, getDemandSkill } from '../API'
import { useSelector, useDispatch } from 'react-redux'
import { formatClients } from '../Data/Format'
import { clientForm as form } from '../Data/Data'
import { removeClient, setupClients } from '../Slices/DashboardSlice'

export const ListAllDemand =() =>{
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const authToken = useSelector((state) => state.user.authToken)
  const [data, setData] = useState([form])

  useEffect(() => {
    const demand = getDemandSkill(authToken, "")
    
    demand.then((res) => { 
      setData(res)
  })
  
  }, [])

  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box ml='15px' mr='15px' mt='10px' display='flex' flexDirection='row' justifyContent='space-between'>
        <CG.Heading size='XS'>Demand List</CG.Heading>
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

        <CG.Table
          customKeyNames={{
            DemandID: 'Demand ID',
            CodeRequisition: 'Code Requisition',
            ClientID: 'Client ID',
            SkillName: 'Skill Name',
            SkillsID: 'Skills ID',
            StartDate: 'Start Date',


          }}
          data={data}
          divider
          selectedKeys={['DemandID', 'CodeRequisition', 'ClientID', 'SkillName', 'SkillsID', 'StartDate', 'Grade', 'Status']
        }
        />
        
      </CG.Box>
    </Col>
    
  )


}

import React, { useEffect, useState } from 'react'
import { CG } from 'cap-shared-components'
import { Col } from 'react-grid-system'

import { useNavigate } from 'react-router-dom'
import { getAllDemand } from '../API'
import { useDispatch } from 'react-redux'
import { clientForm as form } from '../Data/Data'

export const ListAllDemand = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [data, setData] = useState([form])

  useEffect(() => {
    const demand = getAllDemand()

    demand.then((res) => {
      setData(res)
    })
  }, [])

  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box ml='15px' mr='15px' mt='10px' display='flex' flexDirection='row' justifyContent='space-between'>
        <CG.Heading size='XS'>Demand List</CG.Heading>
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
        <CG.Table
          customKeyNames={{
            codeRequisition: 'Code Requisition',
            clientID: 'Client ID',
            skillName: 'Skill Name',
            skillID: 'Skills ID',
            startDate: 'Start Date',
          }}
          data={data}
          divider
          selectedKeys={['codeRequisition', 'clientID', 'skillID', 'skillName', 'startDate', 'grade', 'status']}
        />
      </CG.Box>
    </Col>
  )
}

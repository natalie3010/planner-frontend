import React, { useEffect, useState } from 'react'
import { CG } from 'cap-shared-components'
import { Col } from 'react-grid-system'

import { useNavigate } from 'react-router-dom'
import { getAllSupply } from '../API'
import { clientForm as form } from '../Data/Data'

export const ListAllSupply =() =>{
  const navigate = useNavigate()

  const [data, setData] = useState([form])

  useEffect(() => {
    const supply = getAllSupply()
    
    supply.then((res) => { 
      setData(res)
  })
  
  }, [])

  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box ml='15px' mr='15px' mt='10px' display='flex' flexDirection='row' justifyContent='space-between'>
        <CG.Heading size='XS'>Supply List</CG.Heading>
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
            id: 'Applicant ID',
            skillName: 'Skill Name',
            applicantFirstName: 'Applicant First Name',
            applicantLastName: 'Applicant Last Name',
            applicantStatus: 'Applicant Status',
            skillsID: 'Skills ID',
            applicantType: 'Applicant Type',
          }}
          data={data}
          divider
          selectedKeys={['applicantFirstName', 'applicantLastName' , 'id', 'skillName', 'applicantType', 'applicantStatus']}
        />
        
      </CG.Box>
    </Col>
    
  )


}

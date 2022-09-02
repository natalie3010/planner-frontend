import React, { useEffect, useState } from 'react'
import { CG } from 'cap-shared-components'
import { Col } from 'react-grid-system'

import { useNavigate, useParams } from 'react-router-dom'
import { getClients, getSupplySkill } from '../API'
import { useSelector, useDispatch } from 'react-redux'
import { formatClients } from '../Data/Format'
import { clientForm as form } from '../Data/Data'
import { removeClient, setupClients } from '../Slices/DashboardSlice'

export const ListAllSupply =() =>{
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const authToken = useSelector((state) => state.user.authToken)

  const [data, setData] = useState([form])


  useEffect(() => {
    const supply = getSupplySkill(authToken, "")
    
    supply.then((res) => { 
      setData(res)
  })
  
  }, [])

  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box ml='15px' mr='15px' mt='10px' display='flex' flexDirection='row' justifyContent='space-between'>
        <CG.Heading size='XS'>Supply List</CG.Heading>
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
            ApplicantID: 'Applicant ID',
            SkillName: 'Skill Name',
            ApplicantFirstName: 'Applicant First Name',
            ApplicantLastName: 'Applicant Last Name',
            ApplicantStatus: 'Applicant Status',
            SkillsID: 'Skills ID',
            ApplicantType: 'Applicant Type',
          }}
          data={data}
          divider
          selectedKeys={['ApplicantFirstName', 'ApplicantLastName' , 'ApplicantID', 'SkillName', 'ApplicantType', 'ApplicantStatus']}
        />
        
      </CG.Box>
    </Col>
    
  )


}

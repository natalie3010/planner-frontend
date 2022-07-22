import React, { useState, useEffect } from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-grid-system'

import { useParams } from 'react-router-dom'
import { selectDemandID, removeDemandFromDashboard } from '../Slices/DashboardSlice'
import { useSelector, useDispatch } from 'react-redux'

export const ListDemand = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { skillname } = useParams()

  const token = useSelector((state) => state.user.authToken)

  const requestObject = { method: 'GET', headers: { 'x-access-token': token } }
  const requestObject2 = { method: 'DELETE', headers: { 'x-access-token': token } }
  const [data, getData] = useState([])
  const [tableChanged, setTableChanged] = useState(null)

  useEffect(() => {
    fetchData()
  }, [skillname, data])

  const fetchData = () => {
    const name = skillname.replace(/\-/g, '/')
    let url = `'https://wpp-be.capdigiops.com:4001/api/demand?selectedSkills=${name}`

    fetch(url, requestObject)
      .then((res) => res.json())

      .then((response) => {
        getData(response)
      })
  }
  const deleterow = (DemandID) => {
    let url = `'https://wpp-be.capdigiops.com:4001/api/demand/${DemandID}`
    fetch(url, requestObject2).then(() => {
      dispatch(removeDemandFromDashboard(skillname))
    })
  }
  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box mt='20px' mr='20px' display='flex'>
        <CG.Heading size='XS'>Demand information for {skillname}</CG.Heading>
        <CG.Button primary text='Dashboard' onClick={() => navigate('/protectedRoute/dashboard')}></CG.Button>
      </CG.Box>

      <CG.Box
        width='80em'
        p='0.85rem'
        m='0.85rem'
        display='flex'
        alignContent='center'
        flexDirection='column'
        boxSizing='border-box'
        fontSize='0.85rem'
      >
        <CG.Table
          customKeyNames={{
            firstname: 'ApplicantFirstName',
            lastname: 'ApplicantLastName',
            DemandID: 'Demand ID',
            CodeRequisition: 'Code Requisition',
            ClientID: 'Client ID',
            SkillsID: 'Skills ID',
            StartDate: 'Start Date',
          }}
          data={data}
          divider
          selectedKeys={[
            'DemandID',
            'CodeRequisition',
            'ClientID',
            'SkillsID',
            'Probability',
            'StartDate',
            'Grade',
            'Status',
          ]}
          icons={[
            {
              tableHeader: 'Edit',
              height: '0.90rem',
              width: '0.90rem',
              type: 'Edit2',
              handler: (value) => {
                dispatch(selectDemandID(value.DemandID))
                navigate('/edit-demand')
              },
            },
            {
              tableHeader: 'Delete',
              height: '0.90rem',
              width: '0.90rem',
              type: 'X',
              handler: (value) => deleterow(value.DemandID),
            },
          ]}
        />
      </CG.Box>
    </Col>
  )
}

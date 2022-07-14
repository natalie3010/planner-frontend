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

  useEffect(() => {
    fetchData()
  }, [skillname, data])

  const fetchData = () => {
    let url = 'https://localhost:4001/api/demand?selectedSkills=' + skillname

    fetch(url, requestObject)
      .then((res) => res.json())

      .then((response) => {
        getData(response)
      })
  }

  const deleterow = (DemandID) => {
    let url = `https://localhost:4001/api/demand/${DemandID}`
    fetch(url, requestObject2).then(() => {
      dispatch(removeDemandFromDashboard(skillname))
    })
  }
  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box m='0.08rem' display='flex' boxSizing='border-box' flexDirection='row' justifyContent='center'>
        <CG.Heading size='S'>Demand information for {skillname}</CG.Heading>
      </CG.Box>
      <CG.Box
        width='70rem'
        p='15px'
        m='5px'
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

        <CG.Box m='18rem' alignSelf='center' position='fixed' flexDirection='row'>
          <CG.Button
            primary
            text='Return to dashboard'
            onClick={() => navigate('/protectedRoute/dashboard')}
          ></CG.Button>
        </CG.Box>
      </CG.Box>
    </Col>
  )
}

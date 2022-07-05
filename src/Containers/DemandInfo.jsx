import React, { useState, useEffect } from 'react'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-grid-system'

import { useParams } from 'react-router-dom'
import { selectDemandID, removeDemandFromDashboard } from '../Slices/DashboardSlice'
import { useSelector, useDispatch } from 'react-redux'

export const DemandInformation = () => {
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
    <div>
      <Navigation />
      <div style={{ marginLeft: '20px' }}>
        <CG.Heading size='M' weight='bold'>
          Demand information for {skillname}
        </CG.Heading>
      </div>
      <Row
        justify='center'
        nogutter={false}
        style={{ margin: '0px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}
      >
        <Col>
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
            buttons={[
              {
                tableHeader: 'Edit',
                label: 'Edit',
                icon: 'Edit2',
                handler: (value) => {
                  dispatch(selectDemandID(value.DemandID))
                  navigate('/edit-demand')
                },
              },
              {
                tableHeader: 'Delete',
                label: 'Delete',
                icon: 'X',
                handler: (value) => deleterow(value.DemandID),
              },
            ]}
            icons={[
              {
                tableHeader: 'Edit',
                type: 'Edit2',
                width: '20px',
                height: '20px',
                url: (value) => deleterow(value.DemandID),
              },
            ]}
          />
        </Col>
      </Row>

      <div style={{ marginTop: '50px', marginLeft: '20px', marginBottom: '100px' }}>
        <CG.Button text='Return to dashboard' onClick={() => navigate('/protectedRoute/dashboard')}></CG.Button>
      </div>

      <Footer />
    </div>
  )
}

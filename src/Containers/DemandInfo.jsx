import React, { useState, useEffect } from 'react'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-grid-system'

import { useParams } from 'react-router-dom'
import { selectDemandID } from '../Slices/DashboardSlice'
import { useSelector, useDispatch } from 'react-redux'

export const DemandInformation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { skillname } = useParams()
  console.log(window.location.pathname)
  console.log(window.location.href)
  console.log(skillname)
  const token = useSelector((state) => state.user.authToken)
  console.log(token)
  const requestObject = { method: 'GET', headers: { 'x-access-token': token } }
  const requestObject2 = { method: 'DELETE', headers: { 'x-access-token': token } }
  const [data, getData] = useState([])

  useEffect(() => {
    fetchData()
  }, [skillname])

  const fetchData = () => {
    let url = `https://localhost:4001/api/demand?selectedSkills=${skillname}`
    console.log('url is: ', url)

    fetch(url, requestObject)
      .then((res) => res.json())

      .then((response) => {
        console.log(response)
        getData(response)
      })
  }
  const deleterow = (DemandID) => {
    let url = `https://localhost:4001/api/demand/${DemandID}`
    fetch(url, requestObject2).then(() => this.setState({ status: 'Delete successful' }))
  }
  return (
    <div>
      <Navigation />
      <div style={{ marginLeft: '35px' }}>
        <CG.Heading size='M' weight='bold'>
          Demand information for {skillname}
        </CG.Heading>
      </div>
      <Row
        justify='center'
        nogutter={false}
        style={{ margin: '20px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}
      >
        <Col md={18}>
          <CG.Table
            customKeyNames={{
              firstname: 'ApplicantFirstName',
              lastname: 'ApplicantLastName',
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
              'ApplicantID',
              'Status',
            ]}
            buttons={[
              {
                tableHeader: 'Edit',
                label: 'Edit',
                handler: (value) => {
                  dispatch(selectDemandID(value.DemandID))
                  navigate('/edit-demand')
                },
              },
              {
                tableHeader: 'Delete',
                label: 'Delete',
                handler: (value) => deleterow(value.DemandID),
              },
            ]}
          />
        </Col>
      </Row>

      <div style={{ marginTop: '50px', marginLeft: '35px', marginBottom: '100px' }}>
        <CG.Button text='Return to dashboard' onClick={() => navigate('/protectedRoute/dashboard')}></CG.Button>
      </div>

      <Footer />
    </div>
  )
}

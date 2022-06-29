import React, { useState, useEffect } from 'react'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-grid-system'

import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export const DemandInformation = () => {
  let { skillname } = useParams()
  console.log(window.location.pathname)
  console.log(window.location.href)
  console.log(skillname)
  const token = useSelector((state) => state.user.authToken)
  console.log(token)
  const requestObject = { method: 'GET', headers: { 'x-access-token': token } }

  const [data, getData] = useState([])

  const navigate = useNavigate()
  useEffect(() => {
    fetchData()
  }, [skillname])

  const fetchData = () => {
    if (skillname === 'UI UX Designer') {
      let url = 'https://localhost:4001/api/demand?selectedSkills=UI/UX Designer'
      console.log(url)

      fetch(url, requestObject)
        .then((res) => res.json())

        .then((response) => {
          console.log(response)
          getData(response)
        })
    } else {
      let url = 'https://localhost:4001/api/demand?selectedSkills=' + skillname
      console.log(url)

      fetch(url, requestObject)
        .then((res) => res.json())

        .then((response) => {
          console.log(response)
          getData(response)
        })
    }
  }

  return (
    <div>
      <Navigation />
      <div style={{ marginLeft: '35px' }}>
        <CG.Heading>Demand information for {skillname}</CG.Heading>
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
                handler: (value) => window.open('/edit-supply'),
              },
              {
                tableHeader: 'Delete',
                label: 'Delete',
                handler: (i) => data.splice(i, 1),
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

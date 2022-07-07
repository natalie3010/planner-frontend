import React, { useState, useEffect } from 'react'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'

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
    <div style={{ textAlign: 'center', height: '1200px' }}>
      <Navigation />
      <div style={{ textAlign: 'center' }}>
        <CG.Heading>Demand information for {skillname}</CG.Heading>
        <Row justify="around">
    <Col md={3}>
      <b>
        Divider
      </b>
    </Col>
    <Col>
      <CG.Table
        {data.map((item,i) => ( 
          <tr key={i}></tr>
        data={[
          {
            DemandID: {item.DemandID},
            CodeRequisition:  {item.CodeRequisition},
            ClientID: {item.ClientID},
            SkillsID: {item.SkillsID},
            Probability: {item.Probability},
            StartDate: {item.StartDate},
            Grade:  {item.Grade},
            SelectedApplicantID: {item.SelectedApplicantID},
            Status:{item.Status}

          },
          
        ]}))}
        divider
        
      />
    </Col>
  </Row>
       
       
        <div style={{ marginTop: '50px' }}>
          <CG.Button text='Return to dashboard' onClick={() => navigate('/protectedRoute/dashboard')}></CG.Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

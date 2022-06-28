import React, { useEffect, useState } from 'react'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { Col, Row } from 'react-grid-system'

import { CG } from 'cap-shared-components'

import { useNavigate } from 'react-router-dom'
import { getClients, getSkills } from '../API'
import { formatSkills, formatClients } from '../Data/Format'
import { demand_status, demand_grade } from '../Data/Data'
import { useSelector, useDispatch } from 'react-redux'

export const DemandPage = () => {
  const navigate = useNavigate()
  const authToken = useSelector((state) => state.user.authToken)
  const [pickerSkills, setPickerSkills] = useState(null)
  const [pickerClients, setPickerClients] = useState(null)
  useEffect(() => {
    const requestClients = getClients(authToken)
    requestClients.then((clientsResult) => setPickerClients(formatClients(clientsResult)))

    const requestSkills = getSkills(authToken)
    requestSkills.then((skillsResult) => setPickerSkills(formatSkills(skillsResult)[0]))
  }, [])
  // form data
  let form = {
    codeRequisition: null, //string
    startDate: null, //string
    clientID: null, //number picker
    originatorName: null, //string
    skillsID: null, //number picker
    probability: null, //number
    grade: null, //string picker
    selectedApplicant: null, //string
    status: null, //string picker
    notes: null, //string
    proposedApplicant: null, //string
    creationDate: null, //string
    location: null, //string
  }
  const [formData, setFormData] = useState(form)
  // picker input fields
  const pickerInput = {
    clientID: { options: pickerClients },
    skillsID: { options: pickerSkills },
    grade: { options: demand_grade },
    status: { options: demand_status },
  }

  const inputs = Object.keys(form).map((formItem) => {
    if (formItem === 'clientID' || formItem === 'skillsID' || formItem === 'grade' || formItem === 'status') {
      return (
        <CG.Container margin='10px'>
          <CG.Picker
            id='Picker'
            name='Picker'
            pattern='*'
            topLabel
            onChange={(val) => setFormData({ ...formData, [formItem]: val })}
            options={pickerInput[formItem].options}
            labelKey='name'
            placeholder={`Select ${formItem}`}
            label={formItem}
          />
        </CG.Container>
      )
    }
    return (
      <CG.Container margin='10px'>
        <CG.Input
          label={formItem}
          onInput={(e) => setFormData({ ...formData, [formItem]: e.target.value })} //computed property names
          margin={0.5}
        />
      </CG.Container>
    )
  })

  const handleSubmit = () => {
    console.log('submitted form: ', formData)
  }
  if (!pickerClients || !pickerSkills) {
    return <CG.Body>loading...</CG.Body>
  }

  return (
    <Row justify='between'>
      <Col md={12} align='center' justify='center'>
        <Navigation />
        <div style={{ width: 600 }}>
          <CG.Heading>Add a new demand</CG.Heading>
          <CG.Container>
            {inputs}
            <CG.Container margin='10px'>
              <Row justify='around'>
                <CG.Button text='submit' onClick={handleSubmit} />
                <CG.Button
                  text='cancel'
                  onClick={() => {
                    navigate('/protectedRoute/dashboard')
                  }}
                />
              </Row>
            </CG.Container>
          </CG.Container>
        </div>
        <Footer />
      </Col>
    </Row>
  )
}

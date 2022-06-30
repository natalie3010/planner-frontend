import React, { useEffect, useState } from 'react'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { Col, Row } from 'react-grid-system'

import { CG } from 'cap-shared-components'

import { useNavigate } from 'react-router-dom'
import { getClients, getSkills, addDemand } from '../API'
import { formatSkills, formatClients, demandFormFormatter } from '../Data/Format'
import { demand_status, demand_grade, demandForm as form } from '../Data/Data'
import { useSelector, useDispatch } from 'react-redux'
import { addDemandToDashboard } from '../Slices/DashboardSlice'

export const DemandPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.user.authToken)
  const [pickerSkills, setPickerSkills] = useState(null)
  const [pickerClients, setPickerClients] = useState(null)

  useEffect(() => {
    const requestClients = getClients(authToken)
    requestClients.then((clientsResult) => setPickerClients(formatClients(clientsResult)))

    const requestSkills = getSkills(authToken)
    requestSkills.then((skillsResult) => setPickerSkills(formatSkills(skillsResult)[0]))
  }, [])

  const [formData, setFormData] = useState(form)
  const inputDefaults = demandFormFormatter(pickerClients, pickerSkills, demand_grade, demand_status)

  const handleSubmit = () => {
    const skillName = pickerSkills[formData.skillsID - 1].name
    const request = addDemand(authToken, formData)
    request.then((result) => {
      dispatch(addDemandToDashboard(skillName))
      navigate('/protectedRoute/dashboard')
    })
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
            {Object.keys(form).map((formItem, index) => {
              if (formItem === 'clientID' || formItem === 'skillsID' || formItem === 'grade' || formItem === 'status') {
                return (
                  <CG.Container margin='10px' key={index}>
                    <CG.Picker
                      id='Picker'
                      name='Picker'
                      pattern='*'
                      topLabel
                      onChange={(val) => setFormData({ ...formData, [formItem]: val })}
                      options={inputDefaults[formItem].options}
                      labelKey='name'
                      placeholder={inputDefaults[formItem].placeholder}
                      label={inputDefaults[formItem].label}
                    />
                  </CG.Container>
                )
              }
              let displayErrorBox = false
              let regexPattern
              if (inputDefaults[formItem].validators[0]) {
                displayErrorBox = true
                regexPattern = new RegExp(inputDefaults[formItem].validators[0].pattern)
              }

              return (
                <CG.Container margin='10px' key={index}>
                  <CG.Input
                    label={inputDefaults[formItem].label}
                    onInput={(e) => setFormData({ ...formData, [formItem]: e.target.value })} // [] => computed property names
                    margin={0.5}
                    placeholder={inputDefaults[formItem].placeholder}
                  />
                  {formData[formItem] && displayErrorBox && !regexPattern.test(formData[formItem]) ? (
                    <span>{inputDefaults[formItem].validators[0].errorDisplayed}</span>
                  ) : null}
                </CG.Container>
              )
            })}
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

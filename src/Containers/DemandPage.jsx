import React, { useEffect, useState } from 'react'
import { Col } from 'react-grid-system'
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
  const [formData, setFormData] = useState(form)
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const requestClients = getClients(authToken)
    requestClients.then((clientsResult) => setPickerClients(formatClients(clientsResult)))

    const requestSkills = getSkills(authToken)
    requestSkills.then((skillsResult) => setPickerSkills(formatSkills(skillsResult)[0]))
  }, [])

  const inputDefaults = demandFormFormatter(pickerClients, pickerSkills, demand_grade, demand_status)

  const handleSubmit = () => {
    setFormSubmitted(true)
    if (checkIfFormIsValidated()) {
      const skillSelected = formData.skillsID && true
      const skillName = skillSelected && pickerSkills[formData.skillsID - 1].name
      const request = addDemand(authToken, formData)
      request.then((result) => {
        skillSelected && dispatch(addDemandToDashboard(skillName))
        navigate('/protectedRoute/dashboard')
      })
    }
  }

  const testRegex = (formItem, inputValue) => {
    const regexPattern = new RegExp(inputDefaults[formItem].validators[0].pattern)
    return regexPattern.test(inputValue)
  }

  const checkIfFormIsValidated = () => {
    let validated = true
    Object.keys(inputDefaults).map((formItem) => {
      const required = inputDefaults[formItem].validators[0].required
      const inputValue = formData[formItem]
      const hasRegex = inputDefaults[formItem].validators[0].pattern && true
      if (required && hasRegex && !testRegex(formItem, inputValue)) {
        validated = false
      } else if (required && !inputValue) {
        validated = false
      }
    })
    return validated
  }
  if (!pickerClients || !pickerSkills) {
    return <CG.Body>loading...</CG.Body>
  }
  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box width='400px' mb={80}>
        <CG.Heading>Add a new demand</CG.Heading>

        {Object.keys(inputDefaults).map((formItem, index) => {
          if (inputDefaults[formItem].inputType === 'dropdown') {
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
                  label={inputDefaults[formItem].label}
                  placeholder={inputDefaults[formItem].placeholder}
                  required={inputDefaults[formItem].validators[0].required}
                  hasError={inputDefaults[formItem].validators[0].required && !formData[formItem] && formSubmitted}
                />
              </CG.Container>
            )
          }
          const hasRegex = inputDefaults[formItem].validators[0].pattern && true

          return (
            <CG.Container margin='10px' key={index}>
              <CG.Input
                label={inputDefaults[formItem].label}
                onInput={(e) => setFormData({ ...formData, [formItem]: e.target.value })} // [] => computed property names
                margin={0.5}
                placeholder={inputDefaults[formItem].placeholder}
                required={inputDefaults[formItem].validators[0].required}
                hasError={
                  (hasRegex && formData[formItem] && !testRegex(formItem, formData[formItem])) ||
                  (inputDefaults[formItem].validators[0].required && !formData[formItem] && formSubmitted)
                }
              />
            </CG.Container>
          )
        })}
        <CG.Box mr='10px' ml='30px' mb={10} display='flex' flexDirection='row' justifyContent='space-between'>
          <CG.Button primary text='submit' onClick={handleSubmit} />
          <CG.Button
            primary
            text='cancel'
            onClick={() => {
              navigate('/protectedRoute/dashboard')
            }}
          />
        </CG.Box>
      </CG.Box>
    </Col>
  )
}

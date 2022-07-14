import React, { useEffect, useState } from 'react'
import { Col } from 'react-grid-system'

import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { getClients, getSkills, getSingleDemand, updateDemand } from '../API'
import { formatSkills, formatClients, demandFormFormatter, lowerCaseKeys } from '../Data/Format'
import { demand_status, demand_grade, demandForm as form } from '../Data/Data'
import { useSelector, useDispatch } from 'react-redux'
import { addDemandToDashboard, removeDemandFromDashboard } from '../Slices/DashboardSlice'

export const EditDemand = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.user.authToken)
  const demandID = useSelector((state) => state.dashboard.selectedDemand)
  const [pickerSkills, setPickerSkills] = useState(null)
  const [defaultSkillName, setDefaultSkillName] = useState(null)
  const [pickerClients, setPickerClients] = useState(null)
  const [formData, setFormData] = useState(null)

  useEffect(() => {
    const requestClients = getClients(authToken)
    requestClients.then((clientsResult) => setPickerClients(formatClients(clientsResult)))

    const requestSkills = getSkills(authToken)
    requestSkills.then((skillsResult) => setPickerSkills(formatSkills(skillsResult)[0]))

    const requestDemand = getSingleDemand(demandID, authToken)
    requestDemand.then((demandResult) => {
      setFormData(lowerCaseKeys(demandResult))
      const requestSkills = getSkills(authToken)
      requestSkills.then((skillsResult) => {
        const myArray = formatSkills(skillsResult, demandResult.SkillsID)
        setPickerSkills(myArray[0])
        setDefaultSkillName(myArray[1])
      })
    })
  }, [])

  const inputDefaults = demandFormFormatter(pickerClients, pickerSkills, demand_grade, demand_status)

  const handleSubmit = () => {
    const newskillname = pickerSkills[formData.skillsID - 1].name

    if (checkIfFormIsValidated()) {
      const request = updateDemand(authToken, demandID, formData)
      request.then((result) => {
        if (defaultSkillName === newskillname) {
          navigate('/protectedRoute/dashboard')
        } else if (newskillname && defaultSkillName) {
          dispatch(removeDemandFromDashboard(defaultSkillName))
          dispatch(addDemandToDashboard(newskillname))
          navigate('/protectedRoute/dashboard')
        } else if (newskillname) {
          dispatch(addDemandToDashboard(newskillname))
          navigate('/protectedRoute/dashboard')
        }
      })
    }
  }
  const checkIfFormIsValidated = () => {
    let validated = true
    const requiredInputs = []
    for (const key in inputDefaults) {
      try {
        const required = inputDefaults[key].validators[0].required
        const pattern = inputDefaults[key].validators[0].pattern
        required && requiredInputs.push([key, pattern])
      } catch {}
    }
    requiredInputs.forEach((input) => {
      const inputData = formData[input[0]]
      const regexPattern = new RegExp(input[1])
      if (!inputData) {
        validated = false
      } else if (!regexPattern.test(inputData)) {
        validated = false
      }
    })
    return validated
  }

  if (!pickerClients || !pickerSkills || !formData || !defaultSkillName) {
    return <CG.Body>loading...</CG.Body>
  }
  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box width='400px' mt={10}>
        <CG.Heading>Edit a demand</CG.Heading>
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
                  placeholder={formItem === 'skillsID' ? defaultSkillName : formData[formItem]}
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
                initValue={formData[formItem] ?? ''}
                label={inputDefaults[formItem].label}
                onInput={(e) => setFormData({ ...formData, [formItem]: e.target.value })} // [] => computed property names
                margin={0.5}
              />
              {formData[formItem] && displayErrorBox && !regexPattern.test(formData[formItem]) ? (
                <span>{inputDefaults[formItem].validators[0].errorDisplayed}</span>
              ) : null}
            </CG.Container>
          )
        })}
        <CG.Box ml='38px' mr='20px' mb={10} mt='10px' display='flex' flexDirection='row' justifyContent='space-between'>
          <CG.Button primary text='submit' onClick={handleSubmit} />
          <CG.Button
            primary
            text='cancel'
            onClick={() => {
              navigate(-1)
            }}
          />
        </CG.Box>
      </CG.Box>
    </Col>
  )
}

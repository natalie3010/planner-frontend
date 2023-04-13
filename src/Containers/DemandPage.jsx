import React, { useEffect, useState } from 'react'
import { Col } from 'react-grid-system'
import { useNavigate } from 'react-router-dom'
import { getClients, getSkills, addDemand } from '../API'
import { formatSkills, formatClients, demandFormFormatter } from '../Data/Format'
import { demand_status, demand_grade, demandForm as form } from '../Data/Data'
import { useSelector, useDispatch } from 'react-redux'
import { addDemandToDashboard } from '../Slices/DashboardSlice'
import { testRegex } from '../Utils/regex'
import { demandSchema } from '../Validations/DemandValidation'
import { v4 as uuidv4 } from 'uuid'

export const DemandPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [pickerSkills, setPickerSkills] = useState(null)
  const [pickerClients, setPickerClients] = useState(null)
  const [formData, setFormData] = useState(form)
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const requestClients = getClients()
    requestClients.then((clientsResult) => setPickerClients(formatClients(clientsResult)))
    const requestSkills = getSkills()
    requestSkills.then((skillsResult) => setPickerSkills(formatSkills(skillsResult)[0]))
  }, [])

  const inputDefaults = demandFormFormatter(pickerClients, pickerSkills, demand_grade, demand_status)

  const handleSubmit = async () => {
    try {
      setFormSubmitted(true)
      const skill = pickerSkills.find((skill) => skill.value == formData.skillID)
      const client = pickerClients.find((client) => client.value == formData.id)

      const formIsValid = await checkIfFormIsValid()
      formData.skillName = skill.name
      formData.clientID = client.name
      if (formIsValid) {
        let requestFormData = formData
        requestFormData.id = uuidv4()
        const demandReq = {
          demand: formData,
        }
        const request = await addDemand(demandReq)

        dispatch(addDemandToDashboard(skill.name))
      }
      navigate('/dashboard')
    } catch (err) {}
  }

  const checkIfFormIsValid = () => {
    const isValid = demandSchema.isValid(formData)
    return isValid
  }

  if (!pickerClients || !pickerSkills) {
    return <CG.Body>loading...</CG.Body>
  }
  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box width='400px' mb={10}>
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
                  (hasRegex &&
                    formData[formItem] &&
                    !testRegex(inputDefaults[formItem].validators[0].pattern, formData[formItem])) ||
                  (inputDefaults[formItem].validators[0].required && !formData[formItem] && formSubmitted)
                }
              />
            </CG.Container>
          )
        })}
        <CG.Box width='300px' display='flex' flexDirection='row' justifyContent='space-between'>
          <CG.Button primary text='submit' onClick={handleSubmit} />
          <CG.Button
            primary
            text='cancel'
            onClick={() => {
              navigate('/dashboard')
            }}
          />
        </CG.Box>
      </CG.Box>
    </Col>
  )
}

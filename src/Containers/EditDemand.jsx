import React, { useEffect, useState } from 'react'
import { Col } from 'react-grid-system'

import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { getClients, getSkills, getSingleDemand, updateDemand } from '../API'
import { formatSkills, formatClients, demandFormFormatter, lowerCaseKeys } from '../Data/Format'
import { demand_status, demand_grade, demandForm as form } from '../Data/Data'
import { useSelector, useDispatch } from 'react-redux'
import { addDemandToDashboard, removeDemandFromDashboard } from '../Slices/DashboardSlice'
import { testRegex } from '../Utils/regex'
import { demandSchema } from '../Validations/DemandValidation'

export const EditDemand = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.user.authToken)
  const demandID = useSelector((state) => state.dashboard.selectedDemand)
  const [dataDemand, setDataDemand] = useState(false)
  const [pickerSkills, setPickerSkills] = useState(null)
  const [defaultSkillName, setDefaultSkillName] = useState(null)
  const [pickerClients, setPickerClients] = useState(null)
  const [formData, setFormData] = useState(form)
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const requestClients = getClients(authToken)
    requestClients.then((clientsResult) => setPickerClients(formatClients(clientsResult)))

    const requestSkills = getSkills(authToken)
    requestSkills.then((skillsResult) => setPickerSkills(formatSkills(skillsResult)[0]))

    const requestDemand = getSingleDemand(demandID, authToken)
    requestDemand.then((demandResult) => {
      setDataDemand(demandResult)
      const requestSkills = getSkills(authToken)
      requestSkills.then((skillsResult) => {
        const myArray = formatSkills(skillsResult, demandResult.SkillsID)
        setPickerSkills(myArray[0])
        setDefaultSkillName(myArray[1])
      })
    })
  }, [])

  const inputDefaults = demandFormFormatter(pickerClients, pickerSkills, demand_grade, demand_status)

  const handleSubmit = async () => {
    setFormSubmitted(true)

    const data = {
      codeRequisition: formData.codeRequisition ?? dataDemand.CodeRequisition,
      startDate: formData.startDate ?? dataDemand.StartDate,
      clientID: formData.clientID ?? dataDemand.ClientID,
      originatorName: formData.originatorName ?? dataDemand.OriginatorName,
      skillsID: formData.skillsID ?? dataDemand.SkillsID,
      probability: formData.probability ?? dataDemand.Probability,
      grade: formData.grade ?? dataDemand.Grade,
      selectedApplicant: formData.selectedApplicant ?? dataDemand.SelectedApplicant,
      status: formData.status ?? dataDemand.Status,
      notes: formData.notes ?? dataDemand.Notes,
      proposedApplicant: formData.proposedApplicant ?? dataDemand.ProposedApplicant,
      creationDate: formData.creationDate ?? dataDemand.CreationDate,
      location: formData.location ?? dataDemand.Location,
    }
    const isValid = await checkIfFormIsValid(data)
    if (isValid) {
      const skillSelected = formData.skillsID && true
      const newskillname = skillSelected && pickerSkills[formData.skillsID - 1].name
      const request = updateDemand(authToken, demandID, data)
      request.then((result) => {
        if (defaultSkillName === newskillname) {
          navigate(-1)
        } else if (skillSelected && defaultSkillName) {
          dispatch(removeDemandFromDashboard(defaultSkillName))
          dispatch(addDemandToDashboard(newskillname))
          navigate(-1)
        } else if (skillSelected) {
          dispatch(addDemandToDashboard(newskillname))
          navigate(-1)
        } else {
          navigate(-1)
        }
      })
    }
  }

  const checkIfFormIsValid = async (data) => {
    const isValid = await demandSchema.isValid(data)
    return isValid
  }

  if (!pickerClients || !pickerSkills || !dataDemand || !defaultSkillName) {
    return <CG.Body>loading...</CG.Body>
  }
  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box width='400px' mb={10}>
        <CG.Heading>Edit a demand</CG.Heading>
        {Object.keys(inputDefaults).map((formItem, index) => {
          const required = inputDefaults[formItem].validators[0].required
          const responseKey = inputDefaults[formItem].responseKey
          if (inputDefaults[formItem].inputType === 'dropdown') {
            const pickerVal = dataDemand[responseKey]
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
                  placeholder={typeof pickerVal === 'number' ? defaultSkillName : pickerVal}
                  required={required}
                  hasError={required && !formData[formItem] && formSubmitted}
                />
              </CG.Container>
            )
          }

          const hasRegex = inputDefaults[formItem].validators[0].pattern && true

          return (
            <CG.Container margin='10px' key={index}>
              <CG.Input
                label={inputDefaults[formItem].label}
                initValue={dataDemand[responseKey] ?? ''}
                onInput={(e) => setFormData({ ...formData, [formItem]: e.target.value })} // [] => computed property names
                margin={0.5}
                placeholder={inputDefaults[formItem].placeholder}
                required={required}
                hasError={
                  (required &&
                    formSubmitted &&
                    hasRegex &&
                    !formData[formItem] &&
                    !testRegex(inputDefaults[formItem].validators[0].pattern, dataDemand[responseKey])) ||
                  (required &&
                    formSubmitted &&
                    hasRegex &&
                    formData[formItem] &&
                    !testRegex(inputDefaults[formItem].validators[0].pattern, formData[formItem]))
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
              navigate(-1)
            }}
          />
        </CG.Box>
      </CG.Box>
    </Col>
  )
}

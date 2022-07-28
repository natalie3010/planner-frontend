import React, { useState, useEffect } from 'react'
import { Col } from 'react-grid-system'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { getSingleSupply, updateSupply, getSkills } from '../API'
import { formatSkills, supplyFormFormatter } from '../Data/Format'
import { applicant_status, applicant_type, supplyForm as form } from '../Data/Data'
import { useSelector, useDispatch } from 'react-redux'
import { addSupplyToDashboard, removeSupplyFromDashboard } from '../Slices/DashboardSlice'

export const EditSupply = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.user.authToken)
  const applicantID = useSelector((state) => state.dashboard.selectedApplicant)
  // dataSupply - selected supply from Get request
  const [dataSupply, setDataSupply] = useState(null)
  const [dataAllSkills, setDataAllSkills] = useState(null)
  const [dataSkillName, setDataSkillName] = useState(null)
  // form data
  const [formData, setFormData] = useState(form)
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const request = getSingleSupply(applicantID, authToken)
    request.then((supplyResult) => {
      setDataSupply(supplyResult)
      const requestSkills = getSkills(authToken)
      requestSkills.then((skillResult) => {
        const myArray = formatSkills(skillResult, supplyResult.SkillsID)
        setDataAllSkills(myArray[0])
        setDataSkillName(myArray[1])
      })
    })
  }, [])

  const inputDefaults = supplyFormFormatter(applicant_status, dataAllSkills, applicant_type)

  const checkIfValid = () => {
    let validated = true
    Object.keys(inputDefaults).map((formItem) => {
      const required = inputDefaults[formItem].validators[0].required
      const initValue = dataSupply[inputDefaults[formItem].responseKey]
      const inputValue = formData[formItem]
      if (inputDefaults[formItem].inputType === 'text' && required === true && inputValue === '') {
        validated = false
      } else if (required === true && !inputValue && !initValue) {
        validated = false
      }
    })
    return validated
  }
  const handleSubmit = () => {
    setFormSubmitted(true)
    if (checkIfValid()) {
      sendData()
    }
  }

  const sendData = () => {
    const data = {
      applicantID: applicantID ?? dataSupply.ApplicantID,
      applicantFirstName: formData.supplyFName ?? dataSupply.ApplicantFirstName,
      applicantLastName: formData.supplyLName ?? dataSupply.ApplicantLastName,
      applicantStatus: formData.supplyStatus ?? dataSupply.ApplicantStatus,
      skillsID: formData.supplySkillId ?? dataSupply.SkillsID,
      notes: formData.supplyNotes ?? dataSupply.Notes,
      applicantType: formData.supplyType ?? dataSupply.ApplicantType,
      location: formData.supplyLocation ?? dataSupply.Location,
    }

    const request = updateSupply(authToken, applicantID, data)
    request.then((result) => {
      const newSkillName = dataAllSkills[data.skillsID - 1].name
      const oldSkillName = dataAllSkills[dataSupply.SkillsID - 1].name
      // updating the supply state if the supply has changed
      if (formData.supplySkillId && dataSupply.SkillsID) {
        dispatch(removeSupplyFromDashboard(oldSkillName))
        dispatch(addSupplyToDashboard(newSkillName))
      } else if (formData.supplySkillId) {
        dispatch(addSupplyToDashboard(newSkillName))
      }
      navigate(-1)
    })
  }

  if (!dataSupply || !dataAllSkills) {
    return <CG.Body>Loading...</CG.Body>
  }
  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box width='400px' mb={10}>
        <CG.Heading>Edit a supply</CG.Heading>

        {Object.keys(inputDefaults).map((formItem, index) => {
          const responseKey = inputDefaults[formItem].responseKey
          if (inputDefaults[formItem].inputType === 'dropdown') {
            const pickerVal = dataSupply[responseKey]
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
                  placeholder={typeof pickerVal === 'number' ? dataSkillName : pickerVal}
                  label={inputDefaults[formItem].label}
                  required={
                    inputDefaults[formItem].validators[0].required && !formData[formItem] && !dataSupply[responseKey]
                  }
                  hasError={
                    inputDefaults[formItem].validators[0].required &&
                    !formData[formItem] &&
                    !dataSupply[responseKey] &&
                    formSubmitted
                  }
                />
              </CG.Container>
            )
          }
          return (
            <CG.Container margin='10px' key={index}>
              <CG.Input
                label={inputDefaults[formItem].label}
                initValue={dataSupply[responseKey] ?? ''} // Nullish coalescing operator
                onInput={(e) => setFormData({ ...formData, [formItem]: e.target.value })} // [] => computed property names
                margin={0.5}
                placeholder={inputDefaults[formItem].placeholder}
                required={inputDefaults[formItem].validators[0].required}
                hasError={
                  inputDefaults[formItem].validators[0].required &&
                  !formData[formItem] &&
                  !dataSupply[responseKey] &&
                  formSubmitted
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

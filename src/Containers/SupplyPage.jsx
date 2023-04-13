import React, { useEffect, useState } from 'react'
import { Col } from 'react-grid-system'
import { useNavigate } from 'react-router-dom'
import { addSupply, getSkills } from '../API'
import { formatSkills, supplyFormFormatter } from '../Data/Format'
import { applicant_status, applicant_type, supplyForm as form } from '../Data/Data'
import { useSelector, useDispatch } from 'react-redux'
import { addSupplyToDashboard } from '../Slices/DashboardSlice'
import { supplySchema } from '../Validations/SupplyValidation'
import { v4 as uuidv4 } from 'uuid'

export const SupplyPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // dataAllSkills are all the skill, formatted for the picker component
  const [pickerSkills, setPickerSkills] = useState(null)
  const [formData, setFormData] = useState(form)
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const requestSkills = getSkills()
    requestSkills.then((skillsResult) => setPickerSkills(formatSkills(skillsResult)[0]))
  }, [])

  const inputDefaults = supplyFormFormatter(applicant_status, pickerSkills, applicant_type)

  const handleSubmit = async () => {
    setFormSubmitted(true)
    const skill = pickerSkills.find((skill) => skill.value == formData.skillID)
    const formIsValid = await checkIfFormIsValid()
    formData.skillName = skill.name
    if (formIsValid) {
      // const skillName = dataAllSkills.filter((skill) => skill.value == formData.skillID)
      let requestFormData = formData
      requestFormData.id = uuidv4()
      const supplyReq = {
        supply: formData,
      }
      const request = await addSupply(supplyReq)
      if (request) {
        try {
          dispatch(addSupplyToDashboard(skill.name))
        } catch {}
        navigate('/dashboard')
      }
    }
  }

  const checkIfFormIsValid = () => {
    const formIsValid = supplySchema.isValid(formData)
    return formIsValid
  }

  if (!pickerSkills) {
    return <CG.Body>loading...</CG.Body>
  }
  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box width='400px' mb={10}>
        <CG.Heading>Add a new supply</CG.Heading>

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
                  placeholder={inputDefaults[formItem].placeholder}
                  label={inputDefaults[formItem].label}
                  required={inputDefaults[formItem].validators[0].required}
                  hasError={inputDefaults[formItem].validators[0].required && !formData[formItem] && formSubmitted}
                />
              </CG.Container>
            )
          }
          return (
            <CG.Container margin='10px' key={index}>
              <CG.Input
                label={inputDefaults[formItem].label}
                onInput={(e) => setFormData({ ...formData, [formItem]: e.target.value })} // [] => computed property names
                margin={0.5}
                placeholder={inputDefaults[formItem].placeholder}
                required={inputDefaults[formItem].validators[0].required}
                hasError={inputDefaults[formItem].validators[0].required && !formData[formItem] && formSubmitted}
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

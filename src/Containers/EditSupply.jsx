import React, { useState, useEffect } from 'react'
import { Col } from 'react-grid-system'
import { CG } from 'cap-shared-components'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleSupply, updateSupply, getSkills } from '../API'
import { formatSkills, supplyFormFormatter } from '../Data/Format'
import { applicant_status, applicant_type } from '../Data/Data'
import { useSelector, useDispatch } from 'react-redux'
import { addSupplyToDashboard, removeSupplyFromDashboard } from '../Slices/DashboardSlice'
import { supplySchema } from '../Validations/SupplyValidation'

export const EditSupply = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { applicantId } = useParams()
  // dataSupply - selected supply from Get request
  const [initialSkill, setInitialSkill] = useState(null)
  const [initialSkillName, setInitialSkillName] = useState(null)
  const [dataAllSkills, setDataAllSkills] = useState(null)
  // form data
  const [formData, setFormData] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const request = getSingleSupply(applicantId)
    request.then((supplyResult) => {
      setFormData(supplyResult)
      setInitialSkill(supplyResult.skills)
      const requestSkills = getSkills()
      requestSkills.then((skillResult) => {
        const [skillsArray, skillName] = formatSkills(skillResult, supplyResult.skills)
        setDataAllSkills(skillsArray)
        setInitialSkillName(skillName)
      })
    })
  }, [])

  const inputDefaults = supplyFormFormatter(applicant_status, dataAllSkills, applicant_type)

  const handleSubmit = async () => {
    setFormSubmitted(true)
    const formIsValid = await checkIfFormIsValid()
    if (formIsValid) {
      const request = await updateSupply(applicantId, { supply: formData })
      if (request) {
        // response is a bool true
        const newSkillName = formData.skills && dataAllSkills[formData.skills - 1].name
        if (initialSkillName && newSkillName && newSkillName !== initialSkillName) {
          dispatch(removeSupplyFromDashboard(initialSkillName))
          dispatch(addSupplyToDashboard(newSkillName))
        } else if (newSkillName && !initialSkill) {
          dispatch(addSupplyToDashboard(newSkillName))
        }
        const routeName = newSkillName.replace(/\//g, '-')
        navigate(`/supply/all/skill/${routeName}`)
      }
    }
  }

  const checkIfFormIsValid = () => {
    const formIsValid = supplySchema.isValid(formData)
    return formIsValid
  }

  if (!formData || !dataAllSkills) {
    return <CG.Body>Loading...</CG.Body>
  }
  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box width='400px' mb={10}>
        <CG.Heading>Edit a supply</CG.Heading>

        {Object.keys(inputDefaults).map((formItem, index) => {
          if (inputDefaults[formItem].inputType === 'dropdown') {
            const pickerVal = formData[formItem]
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
                  placeholder={typeof pickerVal === 'number' ? initialSkillName : pickerVal}
                  label={inputDefaults[formItem].label}
                  required={inputDefaults[formItem].validators[0].required && !formData[formItem]}
                  hasError={inputDefaults[formItem].validators[0].required && !formData[formItem] && formSubmitted}
                />
              </CG.Container>
            )
          }
          return (
            <CG.Container margin='10px' key={index}>
              <CG.Input
                label={inputDefaults[formItem].label}
                initValue={formData[formItem] ?? ''} // Nullish coalescing operator
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
              const routeName = initialSkillName.replace(/\//g, '-')
              navigate(`/supply/all/skill/${routeName}`)
            }}
          />
        </CG.Box>
      </CG.Box>
    </Col>
  )
}

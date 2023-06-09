import React, { useEffect, useState } from 'react'
import { Col } from 'react-grid-system'
import { useNavigate, useParams } from 'react-router-dom'
import { getClients, getSkills, getSingleDemand, updateDemand } from '../API'
import { formatSkills, formatClients, demandFormFormatter } from '../Data/Format'
import { demand_status, demand_grade } from '../Data/Data'
import { useSelector, useDispatch } from 'react-redux'
import { addDemandToDashboard, removeDemandFromDashboard } from '../Slices/DashboardSlice'
import { testRegex } from '../Utils/regex'
import { demandSchema } from '../Validations/DemandValidation'

export const EditDemand = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { demandId } = useParams()
  const [pickerSkills, setPickerSkills] = useState(null)
  const [pickerClients, setPickerClients] = useState(null)
  const [initialSkillName, setInitialSkillName] = useState(null)
  const [formData, setFormData] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const requestClients = getClients()
    requestClients.then((clientsResult) => setPickerClients(formatClients(clientsResult)))

    const requestDemand = getSingleDemand(demandId)
    requestDemand.then((demandResult) => {
      setFormData(demandResult)

      const requestSkills = getSkills()
      requestSkills.then((skillsResult) => {
        const [skillsArray, skillName] = formatSkills(skillsResult, demandResult?.demandSkills)
        setPickerSkills(skillsArray)
        setInitialSkillName(skillName)
      })
    })
  }, [])

  const inputDefaults = demandFormFormatter(pickerClients, pickerSkills, demand_grade, demand_status)

  const handleSubmit = async () => {
    setFormSubmitted(true)
    const formIsValid = await checkIfFormIsValid()
    if (formIsValid) {
      const skillSelected = formData.demandSkills && true
      const newskillname = skillSelected && pickerSkills[formData.demandSkills - 1].name
      const request = updateDemand(demandId, { demand: formData })
      request.then((result) => {
        if (initialSkillName && newskillname && newskillname !== initialSkillName) {
          {
            dispatch(removeDemandFromDashboard(initialSkillName))
            dispatch(addDemandToDashboard(newskillname))
          }
        }
        const routeName = newskillname.replace(/\//g, '-')
        navigate(`/demand/all/skill/${routeName}`)
      })
    }
  }

  const checkIfFormIsValid = () => {
    const isValid = demandSchema.isValid(formData)
    return isValid
  }

  if (!pickerClients || !pickerSkills || !formData) {
    return <CG.Body>loading...</CG.Body>
  }

  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box width='400px' mb={10}>
        <CG.Heading>Edit a demand</CG.Heading>
        {Object.keys(inputDefaults).map((formItem, index) => {
          const required = inputDefaults[formItem].validators[0].required
          if (inputDefaults[formItem].inputType === 'dropdown') {
            const pickerVal = formItem === 'demandClientID' ? formData.clientName : formData[formItem]
            return (
              <CG.Container margin='10px' key={index}>
                <div data-testid={inputDefaults[formItem].label}>
                  <CG.Picker
                    id='Picker'
                    name='Picker'
                    pattern='*'
                    topLabel
                    onChange={(val) => setFormData({ ...formData, [formItem]: val })}
                    options={inputDefaults[formItem].options}
                    labelKey='name'
                    label={inputDefaults[formItem].label}
                    placeholder={typeof pickerVal === 'number' ? initialSkillName : pickerVal}
                    required={required}
                    hasError={required && !formData[formItem] && formSubmitted}
                  />
                </div>
              </CG.Container>
            )
          }

          const hasRegex = inputDefaults[formItem].validators[0].pattern && true

          return (
            <CG.Container margin='10px' key={index}>
              <CG.Input
                label={inputDefaults[formItem].label}
                initValue={formData[formItem] ?? ''}
                onInput={(e) => setFormData({ ...formData, [formItem]: e.target.value })}
                margin={0.5}
                placeholder={inputDefaults[formItem].placeholder}
                required={required}
                hasError={
                  (required && formSubmitted && hasRegex && !formData[formItem]) ||
                  (required &&
                    formSubmitted &&
                    hasRegex &&
                    !testRegex(inputDefaults[formItem].validators[0].pattern, formData[formItem]))
                }
              />
            </CG.Container>
          )
        })}

        <CG.Box width='300px' display='flex' flexDirection='row' justifyContent='space-between'>
          <CG.Button primary text='submit' data-testid='submitButton' onClick={handleSubmit} />
          <CG.Button
            primary
            text='cancel'
            data-testId='cancelButton'
            onClick={() => {
              const routeName = initialSkillName.replace(/\//g, '-')
              navigate(`/demand/all/skill/${routeName}`)
            }}
          />
        </CG.Box>
      </CG.Box>
    </Col>
  )
}

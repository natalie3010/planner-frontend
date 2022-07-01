import React, { useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import { Col, Row } from 'react-grid-system'

import { CG } from 'cap-shared-components'

import { useNavigate } from 'react-router-dom'
import { addSupply, getSkills } from '../API'
import { formatSkills } from '../Data/Format'
import { applicant_status, applicant_type } from '../Data/Data'
import { useSelector, useDispatch } from 'react-redux'
import { addSupplyToDashboard } from '../Slices/DashboardSlice'
import formValidators from '../../formValidatorsConfig.json'

export const SupplyPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const supplyFormValidators = formValidators.supplyForm.inputs
  const authToken = useSelector((state) => state.user.authToken)
  // dataAllSkills are all the skill, formatted for the picker component
  const [dataAllSkills, setDataAllSkills] = useState()
  // form data
  const [supplyFName, setSupplyFName] = useState(null)
  const [supplyLName, setSupplyLName] = useState(null)
  const [supplyStatus, setSupplyStatus] = useState(null)
  const [supplySkillId, setSupplySkillId] = useState(null)
  const [supplyNotes, setSupplyNotes] = useState(null)
  const [supplyType, setSupplyType] = useState(null)
  const [supplyLocation, setSupplyLocation] = useState(null)
  // validators
  const [formValidated, setFormValidated] = useState(true)

  useEffect(() => {
    const requestSkills = getSkills(authToken)
    requestSkills.then((skillResult) => {
      const myArray = formatSkills(skillResult, 0)
      setDataAllSkills(myArray[0])
    })
  }, [])

  const handleSubmit = (e) => {
    const data = {
      applicantFirstName: supplyFName,
      applicantLastName: supplyLName,
      applicantStatus: supplyStatus,
      skillsID: supplySkillId,
      notes: supplyNotes,
      applicantType: supplyType,
      location: supplyLocation,
    }
    if (checkIfFormIsValidated()) {
      sendata(data)
    } else {
      setFormValidated(false)
    }
  }

  const checkIfFormIsValidated = () => {
    let validated = false
    if (supplyFName && supplyLName && supplyStatus && supplySkillId && supplyType) {
      validated = true
    }
    return validated
  }

  const sendata = (data) => {
    const skillName = dataAllSkills[data.skillsID - 1].name
    const request = addSupply(authToken, data)
    request.then((result) => {
      dispatch(addSupplyToDashboard(skillName))
      navigate('/protectedRoute/dashboard')
    })
  }
  if (!dataAllSkills) {
    return <CG.Body>loading...</CG.Body>
  }
  return (
    <Row justify='between'>
      <Col md={12} align='center' justify='center'>
        <div style={{ width: 600 }}>
          <CG.Heading>Add a new supply</CG.Heading>
          <CG.Container>
            <CG.Container margin='10px'>
              <CG.Input label={'First name'} onInput={(e) => setSupplyFName(e.target.value)} margin={0.5} required />
              {supplyFName ? null : formValidated ? null : (
                <span>{supplyFormValidators.supplyFirstName.validators[0].errorDisplayed}</span>
              )}
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input label={'Last name'} onInput={(e) => setSupplyLName(e.target.value)} margin={0.5} required />
              {supplyLName ? null : formValidated ? null : (
                <span>{supplyFormValidators.supplyLastName.validators[0].errorDisplayed}</span>
              )}
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Picker
                id='Picker'
                name='Picker'
                pattern='*'
                topLabel
                onChange={(val) => setSupplyStatus(val)}
                options={applicant_status}
                labelKey='name'
                placeholder='Select status'
                label='Status'
              />
              {supplyStatus ? null : formValidated ? null : (
                <span>{supplyFormValidators.supplyStatus.validators[0].errorDisplayed}</span>
              )}
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Picker
                id='Picker'
                name='Picker'
                pattern='*'
                topLabel
                onChange={(val) => setSupplySkillId(val)}
                options={dataAllSkills}
                labelKey='name'
                placeholder='Select a skill'
                label='Skill'
              />
              {supplySkillId ? null : formValidated ? null : (
                <span>{supplyFormValidators.supplySkills.validators[0].errorDisplayed}</span>
              )}
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input label={'Notes'} onInput={(e) => setSupplyNotes(e.target.value)} margin={0.5} required />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input label={'Location'} onInput={(e) => setSupplyLocation(e.target.value)} margin={0.5} required />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Picker
                id='Picker'
                name='Picker'
                pattern='*'
                topLabel
                onChange={(val) => setSupplyType(val)}
                options={applicant_type}
                labelKey='name'
                placeholder='Select type'
                label='Applicant type'
              />
              {supplyType ? null : formValidated ? null : (
                <span>{supplyFormValidators.supplyApplicantType.validators[0].errorDisplayed}</span>
              )}
            </CG.Container>
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
      </Col>
    </Row>
  )
}

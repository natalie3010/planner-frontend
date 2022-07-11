import React, { useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { Col, Row } from 'react-grid-system'

import { CG } from 'cap-shared-components'

import { useNavigate } from 'react-router-dom'
import { getSingleSupply, updateSupply, getSkills } from '../API'
import { formatSkills } from '../Data/Format'
import { applicant_status, applicant_type } from '../Data/Data'
import { useSelector, useDispatch } from 'react-redux'
import { addSupplyToDashboard, removeSupplyFromDashboard } from '../Slices/DashboardSlice'
import formValidators from '../../formValidatorsConfig.json'

export const EditSupply = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.user.authToken)
  const applicantID = useSelector((state) => state.dashboard.selectedApplicant)
  const supplyFormValidators = formValidators.supplyForm.inputs
  // dataSupply - selected supply from get request
  const [dataSupply, setDataSupply] = useState(null)
  const [dataAllSkills, setDataAllSkills] = useState(null)
  const [dataSkillName, setDataSkillName] = useState(null)
  // form data
  const [formData, setFormData] = useState({
    supplyFName: null,
    supplyLName: null,
    supplyStatus: null,
    supplySkillId: null,
    supplyNotes: null,
    supplyType: null,
    supplyLocation: null,
  })
  // error handler
  const [showErrors, setShowErrors] = useState(null)
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

  const checkIfValid = () => {
    let valid = true
    /*for (const key in supplyFormValidators) {
      const required = supplyFormValidators[key].validators[0].required
       if (required === true) {
        console.log(key, '--', formData[key])
        !formData[key] ? setShowErrors({ ...showErrors, [key]: true }) : null
      } 
    }*/
    let nonValidForm = {}
    if (!formData.supplyFName && !dataSupply.ApplicantFirstName) {
      nonValidForm.supplyFName = true
      valid = false
    } else if (!formData.supplyFName && !dataSupply.ApplicantFirstName) {
      nonValidForm.supplyLName = true
      valid = false
    } else if (!formData.supplyStatus && !dataSupply.ApplicantStatus) {
      nonValidForm.supplyStatus = true
      valid = false
    } else if (!formData.supplySkillId && !dataSupply.SkillsID) {
      nonValidForm.supplySkillId = true
      valid = false
    } else if (!formData.supplyType && !dataSupply.ApplicantType) {
      nonValidForm.supplyType = true
      valid = false
    }
    setShowErrors(nonValidForm)
    return valid
  }
  const handleSubmit = () => {
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
      navigate('/protectedRoute/dashboard')
    })
  }

  if (!dataSupply || !dataAllSkills) {
    return <CG.Body>Loading...</CG.Body>
  }
  return (
    <Row justify='between'>
      <Col md={12} align='center' justify='center'>
        <Navigation />
        <div style={{ width: 600 }}>
          <CG.Heading>Edit a supply</CG.Heading>
          <CG.Container>
            <CG.Container margin='10px'>
              <CG.Input
                label={'First name'}
                initValue={dataSupply.ApplicantFirstName ?? ''} // Nullish coalescing operator
                onInput={(e) => {
                  setFormData({ ...formData, supplyFName: e.target.value })
                }}
                margin={0.5}
                required
                hasError={showErrors && showErrors.supplyFName}
              />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input
                label={'Last name'}
                initValue={dataSupply.ApplicantLastName ?? ''}
                onInput={(e) => setFormData({ ...formData, supplyLName: e.target.value })}
                margin={0.5}
                required
                hasError={showErrors && showErrors.supplyLName}
              />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Picker
                id='Picker'
                name='Picker'
                pattern='*'
                topLabel
                onChange={(val) => setFormData({ ...formData, supplyStatus: val })}
                options={applicant_status}
                labelKey='name'
                placeholder={dataSupply.ApplicantStatus}
                label='Status'
                required
                hasError={!formData.supplyStatus && !dataSupply.ApplicantStatus && true}
              />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Picker
                id='Picker'
                name='Picker'
                pattern='*'
                topLabel
                onChange={(val) => setFormData({ ...formData, supplySkillId: val })}
                options={dataAllSkills}
                labelKey='name'
                placeholder={dataSkillName}
                label='Skill'
                required
                hasError={!formData.supplySkillId && !dataSupply.SkillsID && true}
              />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input
                label={'Notes'}
                initValue={dataSupply.Notes ?? ''}
                onInput={(e) => setFormData({ ...formData, supplyNotes: e.target.value })}
                margin={0.5}
              />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input
                label={'Location'}
                initValue={dataSupply.Location ?? ''}
                onInput={(e) => setFormData({ ...formData, supplyLocation: e.target.value })}
                margin={0.5}
              />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Picker
                id='Picker'
                name='Picker'
                pattern='*'
                topLabel
                onChange={(val) => setFormData({ ...formData, supplyType: val })}
                options={applicant_type}
                labelKey='name'
                placeholder={dataSupply.ApplicantType ?? ''}
                label='Applicant type'
                margin={0.5}
                required
                hasError={!formData.supplyType && !dataSupply.ApplicantType && true}
              />
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
        <Footer />
      </Col>
    </Row>
  )
}

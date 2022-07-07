import React, { useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import { Col, Row } from 'react-grid-system'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { CG } from 'cap-shared-components'

import { useNavigate } from 'react-router-dom'
import { getSingleSupply, updateSupply, getSkills } from '../API'
import { formatSkills } from '../Data/Format'
import { applicant_status, applicant_type } from '../Data/Data'
import { useSelector, useDispatch } from 'react-redux'
import { addSupplyToDashboard, removeSupplyFromDashboard } from '../Slices/DashboardSlice'

export const EditSupply = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.user.authToken)
  const applicantID = useSelector((state) => state.dashboard.selectedApplicant)
  // dataSupply - selected supply from get request
  const [dataSupply, setDataSupply] = useState(null)
  const [dataAllSkills, setDataAllSkills] = useState(null)
  const [dataSkillName, setDataSkillName] = useState(null)
  // form data
  const [supplyFName, setSupplyFName] = useState(null)
  const [supplyLName, setSupplyLName] = useState(null)
  const [supplyStatus, setSupplyStatus] = useState(null)
  const [supplySkillId, setSupplySkillId] = useState(null)
  const [supplyNotes, setSupplyNotes] = useState(null)
  const [supplyType, setSupplyType] = useState(null)
  const [supplyLocation, setSupplyLocation] = useState(null)

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

  const handleSubmit = () => {
    const data = {
      applicantID: applicantID ?? dataSupply.ApplicantID,
      applicantFirstName: supplyFName ?? dataSupply.ApplicantFirstName,
      applicantLastName: supplyLName ?? dataSupply.ApplicantLastName,
      applicantStatus: supplyStatus ?? dataSupply.ApplicantStatus,
      skillsID: supplySkillId ?? dataSupply.SkillsID,
      notes: supplyNotes ?? dataSupply.Notes,
      applicantType: supplyType ?? dataSupply.ApplicantType,
      location: supplyLocation ?? dataSupply.Location,
    }

    const request = updateSupply(authToken, applicantID, data)
    request.then((result) => {
      const newSkillName = dataAllSkills[data.skillsID - 1].name
      const oldSkillName = dataAllSkills[dataSupply.SkillsID - 1].name
      // updating the supply state if the supply has changed
      if (supplySkillId && dataSupply.SkillsID) {
        dispatch(removeSupplyFromDashboard(oldSkillName))
        dispatch(addSupplyToDashboard(newSkillName))
      } else if (supplySkillId) {
        dispatch(addSupplyToDashboard(newSkillName))
      }
      navigate('/protectedRoute/dashboard')
    })
  }
  if (!dataSupply || !dataAllSkills) {
    return <CG.Body>Loading...</CG.Body>
  }
  return (
    <div>
      <Navigation />

      <Row justify='between'>
        <Col md={12} align='center' justify='center'>
          <div style={{ width: 600 }}>
            <CG.Heading>Edit a supply</CG.Heading>
            <CG.Container>
              <CG.Container margin='10px'>
                <CG.Input
                  label={'First name'}
                  initValue={dataSupply.ApplicantFirstName ?? ''} // Nullish coalescing operator
                  onInput={(e) => {
                    setSupplyFName(e.target.value)
                  }}
                  margin={0.5}
                />
              </CG.Container>
              <CG.Container margin='10px'>
                <CG.Input
                  label={'Last name'}
                  initValue={dataSupply.ApplicantLastName ?? ''}
                  onInput={(e) => setSupplyLName(e.target.value)}
                  margin={0.5}
                />
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
                  placeholder={dataSupply.ApplicantStatus}
                  label='Status'
                />
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
                  placeholder={dataSkillName}
                  label='Skill'
                />
              </CG.Container>
              <CG.Container margin='10px'>
                <CG.Input
                  label={'Notes'}
                  initValue={dataSupply.Notes ?? ''}
                  onInput={(e) => setSupplyNotes(e.target.value)}
                  margin={0.5}
                />
              </CG.Container>
              <CG.Container margin='10px'>
                <CG.Input
                  label={'Location'}
                  initValue={dataSupply.Location ?? ''}
                  onInput={(e) => setSupplyLocation(e.target.value)}
                  margin={0.5}
                />
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
                  placeholder={dataSupply.ApplicantType ?? ''}
                  label='Applicant type'
                  margin={0.5}
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
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

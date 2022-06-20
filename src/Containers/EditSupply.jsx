import React, { useContext, useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { Col, Row } from 'react-grid-system'
import { myContext } from '../index'

import { CG } from 'cap-shared-components'

import { useNavigate } from 'react-router-dom'
import { getSingleSupply, updateSupply, getSkills } from '../API'
import { formatSkills } from '../Data/Format'
import { applicant_status, applicant_type } from '../Data/Data'

export const EditSupply = () => {
  const appContext = useContext(myContext)
  const navigate = useNavigate()
  // from state
  const applicantID = 25 //appContext.state.supplyId
  const authToken = appContext.state.authToken
  // supply is data about the applicant from the backend
  const [dataSupply, setDataSupply] = useState(null)
  const [dataAllSkills, setDataAllSkills] = useState(null)
  const [dataSkillName, setDataSkillName] = useState()
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
      console.log('loaded data: ', supplyResult)
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
      applicantID: dataSupply.ApplicantID,
      applicantFirstName: supplyFName ?? 'c', //dataSupply.ApplicantFirstName,
      applicantLastName: supplyLName ?? 'c', //dataSupply.ApplicantLastName,
      applicantStatus: supplyStatus ?? 'c', //dataSupply.ApplicantStatus,
      skillsID: supplySkillId ?? 'c', //dataSupply.SkillsID,
      notes: supplyNotes ?? 'c', //dataSupply.Notes,
      applicantType: supplyType ?? 'c', //dataSupply.ApplicantType,
      location: supplyLocation ?? 'c', //dataSupply.Location,
    }
    console.log('changed data: ', data)
    const request = updateSupply(authToken, applicantID, data)
    request.then((result) => {
      console.log('result: ', result)
      // set supplyid state to undefined
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
          {/* replace div with box component */}
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
                placeholder={dataSkillName} // change this from number to string
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
        <Footer />
      </Col>
    </Row>
  )
}

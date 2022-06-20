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
  const applicantID = 34 //appContext.state.supplyId
  const authToken = appContext.state.authToken
  // supply is data about the applicant from the backend
  const [dataSupply, setDataSupply] = useState()
  const [dataAllSkills, setDataAllSkills] = useState()
  const [dataSkillName, setDataSkillName] = useState()
  // form data
  const [supplyFName, setSupplyFName] = useState()
  const [supplyLName, setSupplyLName] = useState()
  const [supplyStatus, setSupplyStatus] = useState()
  const [supplySkillId, setSupplySkillId] = useState()
  const [supplyNotes, setSupplyNotes] = useState()
  const [supplyType, setSupplyType] = useState()
  const [supplyLocation, setSupplyLocation] = useState()

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

  const handleSubmit = (e) => {
    const data = {
      applicantID: dataSupply.ApplicantID,
      applicantFirstName: supplyFName || dataSupply.ApplicantFirstName,
      applicantLastName: supplyLName || dataSupply.ApplicantLastName,
      applicantStatus: supplyStatus || dataSupply.ApplicantStatus,
      skillsID: supplySkillId || dataSupply.SkillsID,
      notes: supplyNotes || dataSupply.Notes,
      applicantType: supplyType || dataSupply.ApplicantType,
      location: supplyLocation || dataSupply.Location,
    }
    console.log(data)
    /* const request = updateSupply(authToken, applicantID, data)
    request.then((result) => {
      console.log(result)
      // set supplyid state to undefined
      // navigate('/protectedRoute/dashboard')
    }) */
  }
  if (!dataSupply) {
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
                initValue={dataSupply.ApplicantFirstName}
                onInput={(e) => {
                  setSupplyFName(e.target.value)
                }}
                margin={0.5}
              />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input
                label={'Last name'}
                initValue={dataSupply.ApplicantLastName}
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
                initValue={dataSupply.Notes}
                onInput={(e) => setSupplyNotes(e.target.value)}
                margin={0.5}
              />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input
                label={'Location'}
                initValue={dataSupply.Location}
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
                placeholder={dataSupply.ApplicantType}
                label='Applicant type'
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

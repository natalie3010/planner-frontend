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
  // data about the supply from the backend
  const [supply, setSupply] = useState()
  // form data
  const [id, setId] = useState()
  const [fName, setFName] = useState()
  const [lName, setLName] = useState()
  const [status, setStatus] = useState()
  const [skillId, setSkillId] = useState()
  const [notes, setNotes] = useState()
  const [type, setType] = useState()
  const [location, setLocation] = useState()
  // data about the skills from the backend
  const [allSkills, setAllSkills] = useState()
  const [skillName, setSkillName] = useState()

  const applicantID = 1 //appContext.state.supplyId
  const authToken = appContext.state.authToken

  useEffect(() => {
    const request = getSingleSupply(applicantID, authToken)
    request.then((supplyResult) => {
      setSupply(supplyResult)

      const requestSkills = getSkills(authToken)
      requestSkills.then((skillResult) => {
        const myArray = formatSkills(skillResult, supplyResult.SkillsID)
        setAllSkills(myArray[0])
        setSkillName(myArray[1])
      })
    })
  }, [])

  const handleSubmit = (e) => {
    const data = {
      applicantID: id || supply.ApplicantID,
      applicantFirstName: fName || supply.ApplicantFirstName,
      applicantLastName: lName || supply.ApplicantLastName,
      applicantStatus: status || supply.ApplicantStatus,
      skillsID: skillId || supply.SkillsID,
      notes: notes || supply.Notes,
      applicantType: type || supply.ApplicantType,
      location: location || supply.Location,
    }
    console.log(data)
    /* const request = updateSupply(authToken, applicantID, data)
    request.then((result) => {
      console.log(result)
      // set supplyid state to undefined
      //navigate to dashboard
    }) */
  }
  if (!supply) {
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
            <CG.Input
              label={'ID'}
              borderRadius='20'
              width='20'
              initValue={supply.ApplicantID}
              onInput={(e) => setId(e.target.value)}
              topLabel={false}
              margin={0.5}
              disabled
            />
            <CG.Container margin='10px'>
              <CG.Input
                label={'First name'}
                initValue={supply.ApplicantFirstName}
                onInput={(e) => {
                  setFName(e.target.value)
                }}
                margin={0.5}
              />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input
                label={'Last name'}
                initValue={supply.ApplicantLastName}
                onInput={(e) => setLName(e.target.value)}
                margin={0.5}
              />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Picker
                id='Picker'
                name='Picker'
                pattern='*'
                topLabel
                onChange={(val) => setStatus(val)}
                options={applicant_status}
                labelKey='name'
                placeholder={supply.ApplicantStatus}
                label='Status'
              />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Picker
                id='Picker'
                name='Picker'
                pattern='*'
                topLabel
                onChange={(value) => console.log('change: ', value)}
                options={allSkills}
                labelKey='name'
                placeholder={skillName} // change this from number to string
                label='Skill'
              />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input
                label={'Notes'}
                initValue={supply.Notes}
                onInput={(e) => setNotes(e.target.value)}
                margin={0.5}
              />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input
                label={'Location'}
                initValue={supply.Location}
                onInput={(e) => setLocation(e.target.value)}
                margin={0.5}
              />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Picker
                id='Picker'
                name='Picker'
                pattern='*'
                topLabel
                onChange={(value) => setType(value)}
                options={applicant_type}
                labelKey='name'
                placeholder={supply.ApplicantType}
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

import React, { useContext, useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { Col, Row } from 'react-grid-system'
import { myContext } from '../index'

import { CG } from 'cap-shared-components'

import { useNavigate } from 'react-router-dom'
import { getSingleSupply, updateSupply } from '../API'

export const EditSupply = () => {
  const appContext = useContext(myContext)
  const navigate = useNavigate()
  const [id, setId] = useState()
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [status, setStatus] = useState('')
  const [skillId, setSkillId] = useState()
  const [notes, setNotes] = useState('')
  const [type, setType] = useState('')
  const [location, setLocation] = useState('')

  const applicantID = 29 //appContext.state.supplyId
  const authToken = appContext.state.authToken
  useEffect(() => {
    const request = getSingleSupply(applicantID, authToken)
    request.then((result) => {
      // state value isn't being passed down to the input component
      setFName(result.ApplicantFirstName)
      setLName(result.ApplicantLastName)
      setStatus(result.ApplicantStatus)
      setType(result.ApplicantType)
      setLocation(result.Location)
      setNotes(result.Notes)
      setSkillId(result.SkillsID)
    })
  }, [])

  const handleSubmit = (e) => {
    const data = {
      applicantID: id,
      applicantFirstName: fName,
      applicantLastName: lName,
      applicantStatus: status,
      skillsID: skillId,
      notes: notes,
      applicantType: type,
      location: location,
    }
    const request = updateSupply(authToken, applicantID, data)
    request.then((result) => {
      console.log(result)
      // set supplyid state to undefined
      //navigate to dashboard
    })
  }

  return (
    <Row justify='between'>
      <Col md={12} align='center' justify='center'>
        <Navigation />
        <div>
          <CG.Heading>Add a new supply</CG.Heading>
          <CG.Container>
            <CG.Input
              label={'ID'}
              borderRadius='20'
              width='20'
              onInput={(e) => setId(e.target.value)}
              topLabel={false}
              margin={0.5}
            />
            <CG.Container margin='10px'>
              <CG.Input label={'First name'} onInput={(e) => setFName(e.target.value)} margin={0.5} />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input label={'Last name'} onInput={(e) => setLName(e.target.value)} margin={0.5} />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input label={'Status'} onInput={(e) => setStatus(e.target.value)} margin={0.5} />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input label={'Skill ID'} onInput={(e) => setSkillId(e.target.value)} margin={0.5} />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input label={'Notes'} onInput={(e) => setNotes(e.target.value)} margin={0.5} />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input label={'Location'} onInput={(e) => setLocation(e.target.value)} margin={0.5} />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input label={'Applicant type'} onInput={(e) => setType(e.target.value)} margin={0.5} />
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
/**
 * On page load supply page loads with data from the database
 * for the given candidate
 * Save id to store, then on page load use the id for get request
 */

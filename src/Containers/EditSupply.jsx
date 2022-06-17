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
  const [supply, setSupply] = useState()
  const [id, setId] = useState()
  const [fName, setFName] = useState()
  const [lName, setLName] = useState()
  const [status, setStatus] = useState()
  const [skillId, setSkillId] = useState()
  const [notes, setNotes] = useState()
  const [type, setType] = useState()
  const [location, setLocation] = useState()

  /**
   * After the edit list supply page is created change
   * applicantID, to refer to the state supplyid
   */
  const applicantID = 1 //appContext.state.supplyId
  const authToken = appContext.state.authToken

  useEffect(() => {
    const request = getSingleSupply(applicantID, authToken)
    request.then((result) => {
      setSupply(result)
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
        <div>
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
              <CG.Input
                label={'Status'}
                initValue={supply.ApplicantStatus}
                onInput={(e) => setStatus(e.target.value)}
                margin={0.5}
              />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input
                label={'Skill ID'}
                initValue={supply.SkillsID}
                onInput={(e) => setSkillId(e.target.value)}
                margin={0.5}
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
              <CG.Input
                label={'Applicant type'}
                initValue={supply.ApplicantType}
                onInput={(e) => setType(e.target.value)}
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

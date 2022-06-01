import React from 'react'
import { useState } from 'react/cjs/react.development'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { Col, Row } from 'react-grid-system'

import { CG } from 'cap-shared-components'

import { useNavigate } from 'react-router-dom'

export const SupplyPage = () => {
  const navigate = useNavigate()
  const [id, setId] = useState()
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [status, setStatus] = useState('')
  const [skillId, setSkillId] = useState()
  const [notes, setNotes] = useState('')
  const [type, setType] = useState('')
  const [location, setLocation] = useState('')

  // end point /api/supply
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
    console.log(data)
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
              onInput={(e) => setId(e.target.value)}
              topLabel={false}
              margin={0.5}
              width={'small'}
            />
            <CG.Input label={'Fist name'} onInput={(e) => setFName(e.target.value)} margin={0.5} />
            <CG.Input label={'Last name'} onInput={(e) => setLName(e.target.value)} margin={0.5} />
            <CG.Input label={'Status'} onInput={(e) => setStatus(e.target.value)} margin={0.5} />
            <CG.Input label={'Skill ID'} onInput={(e) => setSkillId(e.target.value)} margin={0.5} />
            <CG.Input label={'Notes'} onInput={(e) => setNotes(e.target.value)} margin={0.5} />
            <CG.Input label={'Location'} onInput={(e) => setLocation(e.target.value)} margin={0.5} />
            <CG.Input label={'Applicant type'} onInput={(e) => setType(e.target.value)} margin={0.5} />
            <CG.Button text='submit' onClick={handleSubmit} />
            <CG.Button
              text='cancel'
              onClick={() => {
                navigate('/protectedRoute/dashboard')
              }}
            />
          </CG.Container>
        </div>
        <Footer />
      </Col>
    </Row>
  )
}

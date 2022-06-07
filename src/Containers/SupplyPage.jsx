import React, { useContext } from 'react'
import { useState, useEffect } from 'react/cjs/react.development'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { Col, Row } from 'react-grid-system'
import { myContext } from '../index'

import { CG } from 'cap-shared-components'

import { useNavigate } from 'react-router-dom'

export const SupplyPage = () => {
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

  useEffect(() => {
    console.log('state value------------', appContext.state)
  }, [])

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
    sendata(data)
  }

  const sendata = (data) => {
    const authToken = appContext.state.authToken
    const requestObject = {
      method: 'POST',
      headers: {
        'x-access-token': authToken,
      },
      body: JSON.stringify(data),
    }
    fetch('https://localhost:4001/api/supply ', requestObject)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.status)
        }
        return res.json()
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log('Error: ', error)
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

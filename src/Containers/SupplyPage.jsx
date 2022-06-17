import React, { useContext, useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { Col, Row } from 'react-grid-system'
import { myContext } from '../index'

import { CG } from 'cap-shared-components'

import { useNavigate } from 'react-router-dom'
import { addSupply, getSkills } from '../API'
import { formatSkills } from '../Data/Format'
import { applicant_status, applicant_type } from '../Data/Data'

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
  // skill
  const [allSkills, setAllSkills] = useState()

  useEffect(() => {
    const authToken = appContext.state.authToken
    const requestSkills = getSkills(authToken)
    requestSkills.then((skillResult) => {
      const myArray = formatSkills(skillResult, 0)
      setAllSkills(myArray[0])
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
    sendata(data)
  }

  const sendata = (data) => {
    const authToken = appContext.state.authToken
    const request = addSupply(authToken, data)
    request.then((result) => {
      // update state of object to incule data
      // navigate away
    })
  }
  if (!allSkills) {
    return <CG.Body>loading...</CG.Body>
  }
  return (
    <Row justify='between'>
      <Col md={12} align='center' justify='center'>
        <Navigation />
        <div style={{ width: 600 }}>
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
              {/*<CG.Input label={'Status'} onInput={(e) => setStatus(e.target.value)} margin={0.5} />*/}
              <CG.Picker
                id='Picker'
                name='Picker'
                pattern='*'
                topLabel
                onChange={(val) => console.log('change: ', val)}
                options={applicant_status}
                labelKey='name'
                placeholder='Select status'
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
                placeholder='Select a skill'
                label='Skill'
              />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input label={'Notes'} onInput={(e) => setNotes(e.target.value)} margin={0.5} />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input label={'Location'} onInput={(e) => setLocation(e.target.value)} margin={0.5} />
            </CG.Container>
            <CG.Container margin='10px'>
              {/*<CG.Input label={'Applicant type'} onInput={(e) => setType(e.target.value)} margin={0.5} />*/}
              <CG.Picker
                id='Picker'
                name='Picker'
                pattern='*'
                topLabel
                onChange={(value) => console.log('change: ', value)}
                options={applicant_type}
                labelKey='name'
                placeholder='Select type'
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

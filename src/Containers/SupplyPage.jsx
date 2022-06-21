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
  // from state
  const authToken = appContext.state.authToken
  // supply is data about the applicant from the backend
  const [dataAllSkills, setDataAllSkills] = useState()
  // form data
  const [supplyFName, setSupplyFName] = useState()
  const [supplyLName, setSupplyLName] = useState()
  const [supplyStatus, setSupplyStatus] = useState()
  const [supplySkillId, setSupplySkillId] = useState()
  const [supplyNotes, setSupplyNotes] = useState()
  const [supplyType, setSupplyType] = useState()
  const [supplyLocation, setSupplyLocation] = useState()

  useEffect(() => {
    const requestSkills = getSkills(authToken)
    requestSkills.then((skillResult) => {
      const myArray = formatSkills(skillResult, 0)
      setDataAllSkills(myArray[0])
    })
  }, [])
  const handleSubmit = (e) => {
    const data = {
      applicantFirstName: supplyFName ?? 'c',
      applicantLastName: supplyLName ?? 'c',
      applicantStatus: supplyStatus ?? 'c',
      skillsID: supplySkillId ?? 3,
      notes: supplyNotes ?? 'c',
      applicantType: supplyType ?? 'c',
      location: supplyLocation ?? 'c',
    }
    sendata(data)
  }

  const sendata = (data) => {
    const request = addSupply(authToken, data)
    request.then((result) => {
      navigate('/protectedRoute/dashboard')
    })
  }
  if (!dataAllSkills) {
    return <CG.Body>loading...</CG.Body>
  }
  return (
    <Row justify='between'>
      <Col md={12} align='center' justify='center'>
        <Navigation />
        <div style={{ width: 600 }}>
          <CG.Heading>Add a new supply</CG.Heading>
          <CG.Container>
            <CG.Container margin='10px'>
              <CG.Input label={'First name'} onInput={(e) => setSupplyFName(e.target.value)} margin={0.5} />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input label={'Last name'} onInput={(e) => setSupplyLName(e.target.value)} margin={0.5} />
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
                onChange={(val) => setSupplySkillId(val)}
                options={dataAllSkills}
                labelKey='name'
                placeholder='Select a skill'
                label='Skill'
              />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input label={'Notes'} onInput={(e) => setSupplyNotes(e.target.value)} margin={0.5} />
            </CG.Container>
            <CG.Container margin='10px'>
              <CG.Input label={'Location'} onInput={(e) => setSupplyLocation(e.target.value)} margin={0.5} />
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

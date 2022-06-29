import React, { useEffect, useState } from 'react'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { Col, Row } from 'react-grid-system'

import { CG } from 'cap-shared-components'

import { useNavigate } from 'react-router-dom'
import { getClients, getSkills, getSingleDemand, updateDemand } from '../API'
import { formatSkills, formatClients, demandFormFormatter, lowerCaseKeys } from '../Data/Format'
import { demand_status, demand_grade, form } from '../Data/Data'
import { useSelector, useDispatch } from 'react-redux'
import { addDemandToDashboard, removeDemandFromDashboard } from '../Slices/DashboardSlice'

export const EditDemand = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.user.authToken)
  const demandID = useSelector((state) => state.dashboard.selectedDemand)
  const [pickerSkills, setPickerSkills] = useState(null)
  const [defaultSkillName, setDefaultSkillName] = useState(null)
  const [pickerClients, setPickerClients] = useState(null)
  const [formData, setFormData] = useState(null)

  useEffect(() => {
    const requestClients = getClients(authToken)
    requestClients.then((clientsResult) => setPickerClients(formatClients(clientsResult)))

    const requestSkills = getSkills(authToken)
    requestSkills.then((skillsResult) => setPickerSkills(formatSkills(skillsResult)[0]))

    const requestDemand = getSingleDemand(demandID, authToken)
    requestDemand.then((demandResult) => {
      setFormData(lowerCaseKeys(demandResult))
      const requestSkills = getSkills(authToken)
      requestSkills.then((skillsResult) => {
        const myArray = formatSkills(skillsResult, demandResult.SkillsID)
        setPickerSkills(myArray[0])
        setDefaultSkillName(myArray[1])
      })
    })
  }, [])

  const inputDefaults = demandFormFormatter(pickerClients, pickerSkills, demand_grade, demand_status)

  const handleSubmit = () => {
    const newskillname = pickerSkills[formData.skillsID - 1].name

    const request = updateDemand(authToken, demandID, formData)
    request.then((result) => {
      if (defaultSkillName === newskillname) {
        navigate('/protectedRoute/dashboard')
      } else if (newskillname && defaultSkillName) {
        dispatch(removeDemandFromDashboard(defaultSkillName))
        dispatch(addDemandToDashboard(newskillname))
        navigate('/protectedRoute/dashboard')
      } else if (newskillname) {
        dispatch(addDemandToDashboard(newskillname))
        navigate('/protectedRoute/dashboard')
      }
    })
  }

  if (!pickerClients || !pickerSkills || !formData || !defaultSkillName) {
    return <CG.Body>loading...</CG.Body>
  }
  return (
    <Row justify='between'>
      <Col md={12} align='center' justify='center'>
        <Navigation />
        <div style={{ width: 600 }}>
          <CG.Heading>Edit a demand</CG.Heading>
          <CG.Container>
            {Object.keys(form).map((formItem, index) => {
              if (formItem === 'clientID' || formItem === 'skillsID' || formItem === 'grade' || formItem === 'status') {
                return (
                  <CG.Container margin='10px' key={index}>
                    <CG.Picker
                      id='Picker'
                      name='Picker'
                      pattern='*'
                      topLabel
                      onChange={(val) => {
                        console.log(val, formItem)
                        setFormData({ ...formData, [formItem]: val })
                      }}
                      options={inputDefaults[formItem].options}
                      labelKey='name'
                      placeholder={formItem === 'skillsID' ? defaultSkillName : formData[formItem]}
                      label={inputDefaults[formItem].label}
                    />
                  </CG.Container>
                )
              }
              return (
                <CG.Container margin='10px' key={index}>
                  <CG.Input
                    initValue={formData[formItem] ?? ''}
                    label={inputDefaults[formItem].label}
                    onInput={(e) => setFormData({ ...formData, [formItem]: e.target.value })} // [] => computed property names
                    margin={0.5}
                  />
                </CG.Container>
              )
            })}
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

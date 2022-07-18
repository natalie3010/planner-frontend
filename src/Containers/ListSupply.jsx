import React, { useState, useEffect } from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectApplicantID, removeSupplyFromDashboard } from '../Slices/DashboardSlice'
import { Row, Col } from 'react-grid-system'

export const ListSupply = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { skillname } = useParams()

  const token = useSelector((state) => state.user.authToken)

  const requestObject = { method: 'GET', headers: { 'x-access-token': token } }
  const requestObject2 = { method: 'DELETE', headers: { 'x-access-token': token } }
  const [data, getData] = useState([])

  useEffect(() => {
    fetchData()
  }, [skillname, data])

  const fetchData = () => {
    const name = skillname.replace(/\-/g, '/')
    let url = `https://localhost:4001/api/supply?selectedSkills=${name}`

    fetch(url, requestObject)
      .then((res) => res.json())

      .then((response) => {
        getData(response)
      })
  }
  const deleterow = (ApplicantID) => {
    let url = `https://localhost:4001/api/supply/${ApplicantID}`
    fetch(url, requestObject2).then(() => {
      dispatch(removeSupplyFromDashboard(skillname))
    })
  }

  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box m='0.08rem' display='flex' boxSizing='border-box' flexDirection='row' justifyContent='center'>
        <CG.Heading size='S'>Supply information for {skillname}</CG.Heading>
      </CG.Box>
      <CG.Box
        width='70rem'
        p='0.85rem'
        display='flex'
        alignContent='center'
        flexDirection='column'
        boxSizing='border-box'
        fontSize='0.90rem'
      >
        <CG.Table
          customKeyNames={{
            firstname: 'ApplicantFirstName',
            lastname: 'ApplicantLastName',
            ApplicantID: 'Applicant ID',
            ApplicantFirstName: 'Applicant First Name',
            ApplicantLastName: 'Applicant Last Name',
            ApplicantStatus: 'Applicant Status',
            SkillsID: 'Skills ID',
            ApplicantType: 'Applicant Type',
          }}
          data={data}
          divider
          selectedKeys={[
            'ApplicantID',
            'ApplicantFirstName',
            'ApplicantLastName',
            'ApplicantStatus',
            'SkillsID',
            'Notes',
            'ApplicantType',
            'Location',
          ]}
          icons={[
            {
              tableHeader: 'Edit',
              height: '0.90rem',
              width: '0.90rem',
              type: 'Edit2',
              handler: (value) => {
                dispatch(selectApplicantID(value.ApplicantID))
                navigate('/edit-supply')
              },
            },
            {
              tableHeader: 'Delete',
              height: '0.90rem',
              width: '0.90rem',
              type: 'X',
              handler: (value) => deleterow(value.ApplicantID),
            },
          ]}
        />
        <CG.Box m='18rem' alignSelf='center' display='flex' position='fixed' flexDirection='row'>
          <CG.Button
            primary
            text='Return to dashboard'
            onClick={() => navigate('/protectedRoute/dashboard')}
          ></CG.Button>
        </CG.Box>
      </CG.Box>
    </Col>
  )
}

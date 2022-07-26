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
    <div>
      <div style={{ marginLeft: '20px' }}>
        <CG.Heading size='M' weight='bold'>
          Supply information for {skillname}{' '}
        </CG.Heading>
      </div>

      <Row
        justify='center'
        nogutter={false}
        style={{ margin: '0px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}
      >
        <Col>
          <div style={{ minHeight: '300px' }}>

          { data.length > 0 ?
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
                  height: '20px',
                  width: '20px',
                  type: 'Edit2',
                  handler: (value) => {
                    dispatch(selectApplicantID(value.ApplicantID))
                    navigate('/edit-supply')
                  },
                },
                {
                  tableHeader: 'Delete',
                  height: '20px',
                  width: '20px',
                  type: 'X',
                  handler: (value) => deleterow(value.ApplicantID),
                },
              ]}
            />
            :  "No Supply left" }

          </div>
        </Col>
      </Row>

      <div style={{ marginTop: '100px', marginLeft: '20px', marginBottom: '50px' }}>
        <CG.Button text='Return to dashboard' onClick={() => navigate('/protectedRoute/dashboard')}></CG.Button>
      </div>
    </div>
  )
}

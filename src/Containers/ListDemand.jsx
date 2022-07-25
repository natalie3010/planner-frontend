import React, { useState, useEffect } from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-grid-system'

import { useParams } from 'react-router-dom'
import { selectDemandID, removeDemandFromDashboard } from '../Slices/DashboardSlice'
import { useSelector, useDispatch } from 'react-redux'
//change-test
export const ListDemand = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { skillname } = useParams()

  const token = useSelector((state) => state.user.authToken)

  const requestObject = { method: 'GET', headers: { 'x-access-token': token } }
  const requestObject2 = { method: 'DELETE', headers: { 'x-access-token': token } }
  const [data, getData] = useState([])
  const [tableChanged, setTableChanged] = useState(null)

  useEffect(() => {
    fetchData()
  }, [skillname, data])

  const fetchData = () => {
    const name = skillname.replace(/\-/g, '/')
    let url = `https://localhost:4001/api/demand?selectedSkills=${name}`

    fetch(url, requestObject)
      .then((res) => res.json())

      .then((response) => {
        getData(response)
      })
  }
  const deleterow = (DemandID) => {
    let url = `https://localhost:4001/api/demand/${DemandID}`
    fetch(url, requestObject2).then(() => {
      dispatch(removeDemandFromDashboard(skillname))
    })
  }
  return (
    <div>
      <div style={{ marginLeft: '20px' }}>
        <CG.Heading size='M' weight='bold'>
          Demand information for {skillname}
        </CG.Heading>
      </div>
      <Row
        justify='center'
        nogutter={false}
        style={{ margin: '0px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}
      >
        <Col>
          <div style={{ minHeight: '300px' }}>
            <CG.Table
              customKeyNames={{
                firstname: 'ApplicantFirstName',
                lastname: 'ApplicantLastName',
                DemandID: 'Demand ID',
                CodeRequisition: 'Code Requisition',
                ClientID: 'Client ID',
                SkillsID: 'Skills ID',
                StartDate: 'Start Date',
              }}
              data={data}
              divider
              selectedKeys={[
                'DemandID',
                'CodeRequisition',
                'ClientID',
                'SkillsID',
                'Probability',
                'StartDate',
                'Grade',
                'Status',
              ]}
              icons={[
                {
                  tableHeader: 'Edit',
                  height: '20px',
                  width: '20px',
                  type: 'Edit2',
                  handler: (value) => {
                    dispatch(selectDemandID(value.DemandID))
                    navigate('/edit-demand')
                  },
                },
                {
                  tableHeader: 'Delete',
                  height: '20px',
                  width: '20px',
                  type: 'X',
                  handler: (value) => deleterow(value.DemandID),
                },
              ]}
            />
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: '100px', marginLeft: '20px', marginBottom: '50px' }}>
        <CG.Button text='Return to dashboard' onClick={() => navigate('/protectedRoute/dashboard')}></CG.Button>
      </div>
    </div>
  )
}

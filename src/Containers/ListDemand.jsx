import React, { useState, useEffect } from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { Col } from 'react-grid-system'

import { useParams } from 'react-router-dom'
import { removeDemandFromDashboard } from '../Slices/DashboardSlice'
import { useSelector, useDispatch } from 'react-redux'
import { deleteDemand, getDemandSkill } from '../API'

export const ListDemand = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { skillname } = useParams()

  const token = useSelector((state) => state.user.authToken)

  const [data, setData] = useState([])
  const [tableChanged, setTableChanged] = useState(false)

  useEffect(() => {
    const skillName = skillname.replace(/\-/g, '/')
    const skillData = getDemandSkill(token, skillName)
    skillData.then((allDemand) => {
      setData(allDemand)
    })
  }, [skillname, tableChanged])

  const deleterow = (DemandID) => {
    const deleted = deleteDemand(token, DemandID)
    deleted.then((response) => {
      setTableChanged(!tableChanged)
      dispatch(removeDemandFromDashboard(skillname))
    })
  }

  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box ml='15px' mr='15px' mt='10px' display='flex' flexDirection='row' justifyContent='space-between'>
        <CG.Button primary text='Add Demand' onClick={() => navigate('/demand')}></CG.Button>
        <CG.Heading size='XS'>Demand information for {skillname}</CG.Heading>
        <CG.Button primary text='Dashboard' onClick={() => navigate('/protectedRoute/dashboard')}></CG.Button>
      </CG.Box>

      <CG.Box
        width='80em'
        p='0.85rem'
        m='0.85rem'
        display='flex'
        alignContent='center'
        flexDirection='column'
        boxSizing='border-box'
        fontSize='0.85rem'
      >
        {data.length > 0 ? (
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
            selectedKeys={['DemandID', 'CodeRequisition', 'ClientID', 'Probability', 'StartDate', 'Grade', 'Status']}
            icons={[
              {
                tableHeader: 'Edit',
                height: '0.90rem',
                width: '0.90rem',
                type: 'Edit2',
                handler: (value) => {
                  navigate(`/edit-demand/${value.DemandID}`)
                },
              },
              {
                tableHeader: 'Delete',
                height: '0.90rem',
                width: '0.90rem',
                type: 'X',
                handler: (value) => deleterow(value.DemandID),
              },
            ]}
          />
        ) : (
          'No Demand left'
        )}
      </CG.Box>
    </Col>
  )
}

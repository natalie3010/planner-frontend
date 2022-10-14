import React, { useState, useEffect } from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate, useParams } from 'react-router-dom'
import { Col } from 'react-grid-system'
import { removeDemandFromDashboard } from '../Slices/DashboardSlice'
import { useSelector, useDispatch } from 'react-redux'
import { deleteDemand, getDemandSkill } from '../API'

export const ListDemand = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { skillID } = useParams()

  const [data, setData] = useState([])
  const [tableChanged, setTableChanged] = useState(false)

  useEffect(() => {
    const skillData = getDemandSkill(skillID)
    skillData.then((allDemand) => {
      setData(allDemand)
    })
  }, [skillID, tableChanged])

  const deleterow = (DemandID) => {
    const deleted = deleteDemand(DemandID)
    deleted.then((response) => {
      setTableChanged(!tableChanged)
      dispatch(removeDemandFromDashboard(skillID))
    })
  }
  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box ml='15px' mr='15px' mt='10px' display='flex' flexDirection='row' justifyContent='space-between'>
        <CG.Button primary text='Add Demand' onClick={() => navigate('/demand')}></CG.Button>
        <CG.Heading size='XS'>Demand information for {data && data[0] && data[0].skillName}</CG.Heading>
        <CG.Button primary text='Dashboard' onClick={() => navigate('/dashboard')}></CG.Button>
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
        {data && data.length > 0 ? (
          <CG.Table
            customKeyNames={{
              firstname: 'ApplicantFirstName',
              lastname: 'ApplicantLastName',
              id: 'Demand ID',
              codeRequisition: 'Code Requisition',
              clientName: 'Client Name',
              skillsID: 'Skills ID',
              startDate: 'Start Date',
            }}
            data={data}
            divider
            selectedKeys={['id', 'codeRequisition', 'clientName', 'probability', 'startDate', 'grade', 'status']}
            icons={[
              {
                tableHeader: 'Edit',
                height: '0.90rem',
                width: '0.90rem',
                type: 'Edit2',
                handler: (value) => {
                  navigate(`/demand/update/${value.id}`)
                },
              },
              {
                // id: `${value.DemandID}-deleteButton`,
                tableHeader: 'Delete',
                height: '0.90rem',
                width: '0.90rem',
                type: 'X',
                handler: (value) => deleterow(value.id),
              },
            ]}
          />
        ) : (
          'No Demand Left'
        )}
      </CG.Box>
    </Col>
  )
}

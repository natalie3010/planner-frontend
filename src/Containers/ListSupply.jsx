import React, { useState, useEffect } from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeSupplyFromDashboard } from '../Slices/DashboardSlice'
import { Col } from 'react-grid-system'
import { deleteSupply, getSupplySkill } from '../API'

export const ListSupply = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { skillID } = useParams()

  const [data, setData] = useState([])
  const [tableChanged, setTableChanged] = useState(false)

  useEffect(() => {
    const skillData = getSupplySkill(skillID)
    skillData.then((allSupply) => {
      setData(allSupply)
    })
  }, [skillID, tableChanged])

  const deleterow = (ApplicantID) => {
    const deleted = deleteSupply(ApplicantID)
    deleted.then(() => {
      setTableChanged(!tableChanged)
      dispatch(removeSupplyFromDashboard(skillID))
    })
  }

  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box ml='15px' mr='15px' mt='10px' display='flex' flexDirection='row' justifyContent='space-between'>
        <CG.Button primary text='Add Supply' onClick={() => navigate('/supply')}></CG.Button>
        <CG.Heading size='XS'>Supply information for {data && data[0] && data[0].skillName}</CG.Heading>
        <CG.Button primary text='Dashboard' onClick={() => navigate('/dashboard')}></CG.Button>
      </CG.Box>

      <CG.Box
        width='70rem'
        p='0.95rem'
        m='10px'
        display='flex'
        alignContent='center'
        flexDirection='column'
        boxSizing='border-box'
        fontSize='0.90rem'
      >
        {data.length > 0 ? (
          <CG.Table
            customKeyNames={{
              firstname: 'ApplicantFirstName',
              lastname: 'ApplicantLastName',
              id: 'Applicant ID',
              applicantFirstName: 'Applicant First Name',
              applicantLastName: 'Applicant Last Name',
              applicantStatus: 'Applicant Status',
              skillID: 'Skills ID',
              applicantType: 'Applicant Type',
            }}
            data={data}
            divider
            selectedKeys={['id', 'applicantFirstName', 'applicantLastName', 'applicantStatus', 'applicantType']}
            icons={[
              {
                tableHeader: 'Edit',
                height: '0.90rem',
                width: '0.90rem',
                type: 'Edit2',
                handler: (value) => {
                  navigate(`/supply/update/${value.id}`)
                },
              },
              {
                tableHeader: 'Delete',
                height: '0.90rem',
                width: '0.90rem',
                type: 'X',
                handler: (value) => deleterow(value.id),
              },
            ]}
          />
        ) : (
          'No Supply left'
        )}
      </CG.Box>
    </Col>
  )
}

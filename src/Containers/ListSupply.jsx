import React, { useState, useEffect } from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectApplicantID, removeSupplyFromDashboard } from '../Slices/DashboardSlice'
import { Col } from 'react-grid-system'
import { deleteSupply, getSupplySkill } from '../API'

export const ListSupply = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { skillname } = useParams()

  const token = useSelector((state) => state.user.authToken)

  const [data, setData] = useState([])
  const [tableChanged, setTableChanged] = useState(false)

  useEffect(() => {
    const skillName = skillname.replace(/\-/g, '/')
    const skillData = getSupplySkill(token, skillName)
    skillData.then((allSupply) => {
      setData(allSupply)
    })
  }, [skillname, tableChanged])

  const deleterow = (ApplicantID) => {
    const deleted = deleteSupply(token, ApplicantID)
    deleted.then(() => {
      setTableChanged(!tableChanged)
      dispatch(removeSupplyFromDashboard(skillname))
    })
  }

  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box ml='15px' mr='15px' mt='10px' display='flex' flexDirection='row' justifyContent='space-between'>
        <CG.Button primary text='Add Supply' onClick={() => navigate('/supply')}></CG.Button>
        <CG.Heading size='XS'>Supply information for {skillname}</CG.Heading>
        <CG.Button primary text='Dashboard' onClick={() => navigate('/protectedRoute/dashboard')}></CG.Button>
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
        ) : (
          'No Supply left'
        )}
      </CG.Box>
    </Col>
  )
}

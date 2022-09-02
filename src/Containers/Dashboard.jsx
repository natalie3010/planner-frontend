import React, { useEffect, useState } from 'react'
import { Col } from 'react-grid-system'
import { BarChart } from '../Components/BarChart'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { getAllDemand, getAllSupply, getSkills } from '../API'
import { useSelector, useDispatch } from 'react-redux'

export const Dashboard = () => {
  const navigate = useNavigate()
  const authToken = useSelector((state) => state.user.authToken)
  const [allDemand, setAllDemand] = useState(null)
  const [allSupply, setAllSupply] = useState(null)
  const [allSkills, setAllSkills] = useState(null)

  useEffect(() => {
    getAllDemand(authToken).then((data) => {
      setAllDemand(data)
    })
    getAllSupply(authToken).then((data) => {
      setAllSupply(data)
    })
    getSkills(authToken).then((data) => {
      setAllSkills(data)
    })
  }, [])

  const onChartClickNavigate = (page, skillName) => {
    const name = skillName.replace(/\//g, '-')

    navigate(`/list-${page}/${name}`)
  }

  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box width={400} boxSizing='border-box' justifyContent='center'>
        <Col md={11} align='center' justify='center'>
          <CG.Heading size='XS'>Skills Based On Supply and Demand</CG.Heading>
          {!allDemand || !allSupply || !allSkills ? (
            <CG.Body>'loading...'</CG.Body>
          ) : (
            <BarChart
              navigateToListPage={onChartClickNavigate}
              allDemand={allDemand}
              allSupply={allSupply}
              allSkills={allSkills}
            />
          )}

          <CG.Box boxSizing='border-box' display='flex' flexDirection='row' justifyContent='space-between'>
            <>
              <CG.Button text='Add a supply' onClick={() => navigate('/supply')}></CG.Button>
              <CG.Button text='List All Supply' onClick={() => navigate('/listAllSupply')}></CG.Button>
              <CG.Button text='List Clients' onClick={() => navigate('/listClients')}></CG.Button>
              <CG.Button text='List All Demand' onClick={() => navigate('/listAllDemand')}></CG.Button>
              <CG.Button text='Add a demand' onClick={() => navigate('/demand')}></CG.Button>
            </>
          </CG.Box>
        </Col>
      </CG.Box>
    </Col>
  )
}

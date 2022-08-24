import React, { useEffect, useState } from 'react'
import { Col } from 'react-grid-system'
import { BarChart } from '../Components/BarChart'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { getAllDemand, getAllSupply, getDashboard } from '../API'
import { useSelector, useDispatch } from 'react-redux'
import { setupDashboard } from '../Slices/DashboardSlice'

export const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dashboardData = useSelector((state) => state.dashboard.dashboardData)
  const authToken = useSelector((state) => state.user.authToken)
  const [allDemand, setAllDemand] = useState(null)
  const [allSupply, setAllSupply] = useState(null)

  useEffect(() => {
    if (!dashboardData) {
      const request = getDashboard(authToken)
      request.then((result) => {
        dispatch(setupDashboard(result))
      })
    }
    const requestDemand = getAllDemand(authToken)
    requestDemand.then((data) => {
      setAllDemand(data)
    })
    const requestSupply = getAllSupply(authToken)
    requestSupply.then((data) => {
      setAllSupply(data)
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
          {!dashboardData || !allDemand || !allSupply ? (
            <CG.Body>'loading...'</CG.Body>
          ) : (
            <BarChart
              chartData={dashboardData}
              navigateToListPage={onChartClickNavigate}
              allDemand={allDemand}
              allSupply={allSupply}
            />
          )}

          <CG.Box boxSizing='border-box' display='flex' flexDirection='row' justifyContent='space-between'>
            <>
              <CG.Button text='Add a supply' onClick={() => navigate('/supply')}></CG.Button>
              <CG.Button text='List Clients' onClick={() => navigate('/listClients')}></CG.Button>
              <CG.Button text='Add a demand' onClick={() => navigate('/demand')}></CG.Button>
            </>
          </CG.Box>
        </Col>
      </CG.Box>
    </Col>
  )
}

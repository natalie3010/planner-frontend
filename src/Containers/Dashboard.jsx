import React, { useEffect } from 'react'
import { Col } from 'react-grid-system'
import { BarChart } from '../Components/BarChart'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { getDashboard } from '../API'
import { useSelector, useDispatch } from 'react-redux'
import { setupDashboard } from '../Slices/DashboardSlice'
export const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dashboardData = useSelector((state) => state.dashboard.dashboardData)
  const authToken = useSelector((state) => state.user.authToken)
  useEffect(() => {
    if (!dashboardData) {
      const request = getDashboard(authToken)
      request.then((result) => {
        dispatch(setupDashboard(result))
      })
    }
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
          {!dashboardData ? (
            <CG.Body>'loading...'</CG.Body>
          ) : (
            <BarChart chartData={dashboardData} navigateToListPage={onChartClickNavigate} />
          )}

          <CG.Box boxSizing='border-box' display='flex' flexDirection='row' justifyContent='space-between'>
            <>
              <CG.Button text='Add a supply' onClick={() => navigate('/supply')}></CG.Button>
              <CG.Button text='Add a demand' onClick={() => navigate('/demand')}></CG.Button>
            </>
          </CG.Box>
        </Col>
      </CG.Box>
    </Col>
  )
}

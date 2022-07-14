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
    navigate(`/list-${page}/${skillName}`)
  }

  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box width='60rem'>
        <Col md={10} style={{ marginBottom: 8 }} align='center' justify='center'>
          <CG.Heading size='S' weight='bold'>
            Skills Based On Supply and Demand
          </CG.Heading>
          {!dashboardData ? (
            <CG.Body>'loading...'</CG.Body>
          ) : (
            <BarChart chartData={dashboardData} navigateToListPage={onChartClickNavigate} />
          )}
          <CG.Box ml='15px' display='flex' flexDirection='row' justifyContent='space-between'>
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

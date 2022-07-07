import React, { useEffect } from 'react'
import { Row, Col } from 'react-grid-system'
import { BarChart } from '../Components/BarChart'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { getDashboard } from '../API'
import { useSelector, useDispatch } from 'react-redux'
import { setupDashboard } from '../Slices/DashboardSlice'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
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
    <div>
      <Navigation />
      <Row justify='between'>
        <Col md={12} align='center' justify='center'>
          <Col md={10} style={{ marginBottom: 20 }} align='center' justify='center'>
            <CG.Heading size='M' weight='bold'>
              Skills Based On Supply and Demand
            </CG.Heading>

            {!dashboardData ? (
              <CG.Body>'loading...'</CG.Body>
            ) : (
              <BarChart chartData={dashboardData} navigateToListPage={onChartClickNavigate} />
            )}
            <>
              <CG.Button text='Add a supply' onClick={() => navigate('/supply')}></CG.Button>
              <CG.Button text='Add a demand' onClick={() => navigate('/demand')}></CG.Button>
            </>
          </Col>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

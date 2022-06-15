import React, { useEffect, useContext } from 'react'
import { Row, Col } from 'react-grid-system'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { BarChart } from '../Components/BarChart'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { getDashboard } from '../API'
import { myContext } from '../index'

export const Dashboard = () => {
  const navigate = useNavigate()
  const appContext = useContext(myContext)

  useEffect(() => {
    // makes a request to the backend on page load if dashboard data isn't in the state
    if (appContext.state.dashboardData == undefined) {
      const authToken = appContext.state.authToken
      const request = getDashboard(authToken)
      request.then((result) => {
        appContext.requestDispatch({ type: 'DASHBOARD_UPDATE', data: result })
      })
    }
  }, [])
  return (
    <Row justify='between'>
      <Col md={12} align='center' justify='center'>
        <Navigation />
        <Col md={10} style={{ marginBottom: 20 }} align='center' justify='center'>
          <CG.Heading size='M' weight='bold'>
            Skills Based On Supply and Demand
          </CG.Heading>
          {appContext.state.dashboardData == undefined ? (
            <CG.Body>'loading...'</CG.Body>
          ) : (
            <BarChart data={appContext.state.dashboardData} />
          )}
          <>
            <CG.Button text='Add a supply' onClick={() => navigate('/supply')}></CG.Button>
          </>
        </Col>
        <Footer />
      </Col>
    </Row>
  )
}

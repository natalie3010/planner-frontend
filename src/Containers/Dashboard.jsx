import React from 'react'
import { Row, Col } from 'react-grid-system'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { BarChart } from '../Components/BarChart'
import { CG } from 'cap-shared-components'

export const Dashboard = () => {
  return (
    <Row justify='between'>
      <Col md={12} align='center' justify='center'>
        <Navigation />
        <Col md={10} style={{ marginBottom: 20 }} align='center' justify='center'>
          <CG.Heading size='M' weight='bold'>
            Skills Based On Supply and Demand
          </CG.Heading>
          <BarChart />
        </Col>
        <Footer />
      </Col>
    </Row>
  )
}

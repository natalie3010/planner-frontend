import React from 'react'
import { CG } from 'cap-shared-components'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-grid-system'

export const Login = () => {
  return (
    <Row justify='between'>
      <Col md={4} style={{ width: 300 }} offset={{ md: 4 }} align="center"  justify="center">
        <CG.Heading weight='bold' size='S'>
          Workforce Planner
        </CG.Heading>
        <CG.Heading weight='bold' size='S'>
          Login
        </CG.Heading>
        <CG.Input style={{ marginBottom: 20 }} name='textInput' placeholder='Username' label='Label' required />
        <CG.Input style={{ marginBottom: 20 }} name='textInput' placeholder='Password' label='Label' required />

        <Link to='/protectedRoute/dashboard'  >
          <CG.Button text='Login' />
        </Link>
      </Col>
    </Row>
  )
}

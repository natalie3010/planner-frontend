import React, { useContext } from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-grid-system'
import initState from '../store'
import loginReducer from '../loginReducer'
import { myContext } from '../index'

export const Login = () => {
  let navigate = useNavigate()
  const value = useContext(myContext)
  console.log(value, 'login')
  const chcekFlag = async () => {
    value.chcekFlag()
    navigate('/protectedRoute/dashboard')
  }

  return (
    <Row justify='between'>
      <Col md={4} style={{ width: 300 }} offset={{ md: 4 }} align='center' justify='center'>
        <CG.Heading weight='bold' size='S'>
          Workforce Planner
        </CG.Heading>
        <CG.Heading weight='bold' size='S'>
          Login
        </CG.Heading>
        <CG.Input style={{ marginBottom: 20 }} name='textInput' placeholder='Username' label='Label' required />
        <CG.Input style={{ marginBottom: 20 }} name='textInput' placeholder='Password' label='Label' required />
        <CG.Button text='Login' onClick={chcekFlag} />
      </Col>
    </Row>
  )
}

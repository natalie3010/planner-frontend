import React, { useContext } from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-grid-system'
import { myContext } from '../index'
import { useState, useEffect } from 'react/cjs/react.development'

export const Login = () => {
  let navigate = useNavigate()
  const appContext = useContext(myContext)

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // navigate to supply page if user is logged in
  useEffect(() => {
    console.log(appContext.state)
    if (appContext.state.isLoggedIn) {
      navigate('/protectedRoute/dashboard')
    }
  }, [])

  const logIn = () => {
    const data = { username: userName, password: btoa(password) }
    const requestObject = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
    fetch('https://localhost:4001/auth/login ', requestObject)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.status)
        }
        return res.json()
      })
      .then((data) => {
        const authToken = data.token
        appContext.requestDispatch(authToken)
        navigate('/supply')
      })
      .catch((error) => {
        console.log('Error: ', error)
      })
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
        <CG.Input
          style={{ marginBottom: 20 }}
          onInput={(e) => setUserName(e.target.value)}
          name='textInput'
          placeholder='Username'
          label='Label'
          required
        />
        <CG.Input
          style={{ marginBottom: 20 }}
          onInput={(e) => setPassword(e.target.value)}
          name='textInput'
          placeholder='Password'
          label='Label'
          inputType='password'
          required
        />
        <CG.Body size='S'>{errorMessage}</CG.Body>
        <CG.Button text='Login' onClick={logIn} />
      </Col>
    </Row>
  )
}

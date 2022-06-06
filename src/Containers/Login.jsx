import React, { useReducer } from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-grid-system'
import initState from '../store'
import loginReducer from '../loginReducer'
import { useState, useEffect } from 'react/cjs/react.development'

export const Login = () => {
  let navigate = useNavigate()
  //const value = useContext(myContext)
  const [state, dispatch] = useReducer(loginReducer, initState)

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // navigate to supply page if user is logged in
  useEffect(() => {
    console.log(state)
    if (state.isLoggedIn) {
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
    fetch('https://wpp-be.capdigiops.com:4001/auth/login ', requestObject)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.status)
        }
        return res.json()
      })
      .then((data) => {
        console.log(data)
        const authToken = data.token
        dispatch({ type: 'USER_LOGIN', authToken: authToken })
        navigate('/protectedRoute/dashboard')
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
          required
        />
        <CG.Body size='S'>{errorMessage}</CG.Body>
        <CG.Button text='Login' onClick={logIn} />
      </Col>
    </Row>
  )
}

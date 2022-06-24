import React from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-grid-system'
import { useState, useEffect } from 'react/cjs/react.development'
import { submitUserLogin } from '../API'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../Slices/LoginSlice'

export const Login = () => {
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn)
  const pathname = useSelector((state) => state.user.pathname) ?? '/protectedRoute/dashboard'
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (userLoggedIn) {
      navigate(pathname)
    }
  }, [])

  const logIn = () => {
    const request = submitUserLogin(userName, password)
    request.then((result) => {
      if (result.token) {
        const authToken = result.token
        dispatch(login(authToken))
        navigate(pathname)
      } else {
        let message = ''
        switch (result) {
          case (result = 403):
            message = 'Wrong username or password'
            break
          default:
            message = `Error: ${result}`
            break
        }
        setErrorMessage(message)
        const timeoutError = setTimeout(() => {
          setErrorMessage('')
        }, 5000)
        timeoutError
      }
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
          label='Username'
          required
        />
        <CG.Input
          style={{ marginBottom: 20 }}
          onInput={(e) => setPassword(e.target.value)}
          name='textInput'
          placeholder='Password'
          label='Password'
          inputType='password'
          required
        />
        <CG.Body size='S'>{errorMessage}</CG.Body>
        <CG.Button text='Login' onClick={logIn} />
      </Col>
    </Row>
  )
}

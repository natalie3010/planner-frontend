import React, { useState, useEffect } from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { Col } from 'react-grid-system'
import { submitUserLogin } from '../API'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../Slices/LoginSlice'

export const Login = () => {
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn)
  const pathname = useSelector((state) => state.user.pathname) ?? '/dashboard'
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
      if (result) {
        dispatch(login(result))
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
    <Col md={12} align='center' justify='center'>
      <CG.Box
        width='300px'
        p='15px'
        borderBottomWidth={1}
        borderLeftWidth={1}
        borderRightWidth={1}
        borderStyle='solid'
        borderTopWidth={1}
        borderWidth={1}
        m='57px'
      >
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
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              logIn()
            }
          }}
        />
        <CG.Input
          style={{ marginBottom: 20 }}
          onInput={(e) => setPassword(e.target.value)}
          name='textInput'
          placeholder='Password'
          label='Password'
          inputType='password'
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              logIn()
            }
          }}
          required
        />
        <CG.Box mb='20px' m='10px' p='10px'>
          <CG.Body size='S'>{errorMessage}</CG.Body>
          <CG.Button text='Login' onClick={logIn} />
        </CG.Box>
      </CG.Box>
    </Col>
  )
}

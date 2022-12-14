import React, { useState, useEffect } from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { Col, Row } from 'react-grid-system'
import { submitUserLogin } from '../API'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../Slices/LoginSlice'
import Logo from '../../public/images/WPLogo.png'
import CGLogo from '../../public/images/Capgemini_Logo_Color.png'

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
    <Col md={12} style={{ width: '88%' }}>
      <Row>
        <Col md={6} style={{ backgroundColor: '#F7FCFD' }}>
          <CG.Box display='flex' flexDirection='column' p='10px' m='15px'>
            <img style={{ width: '55%', margin: '100px' }} src={Logo} alt=' Workforce Planner Logo ' />{' '}
            <img style={{ width: '28%' }} src={CGLogo} alt=' Workforce Planner Logo ' />
          </CG.Box>
        </Col>
        <Col md={6}>
          <CG.Box
            fontSize='16px'
            width='400px'
            display='flex'
            flexDirection='column'
            fontFamily=' Roboto'
            p='25px'
            m='50px'
          >
            <CG.Box fontSize='22px' display='flex' flexDirection='column' textAlign='center' p='20px' m='20px'>
              <CG.Heading fontWeight='normal' size='M'>
                Welcome to
              </CG.Heading>
              <CG.Heading size='S'>Workforce Planner Application</CG.Heading>
            </CG.Box>
            <CG.Input
              style={{
                width: '400px',
                border: '1px solid #ACACAC',
                fontSize: '14px',
                margin: '4px',
                marginBottom: '20px',
              }}
              onInput={(e) => setUserName(e.target.value)}
              name='textInput'
              label='User name'
              placeholder='Enter your user name'
              required
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  logIn()
                }
              }}
            />
            <CG.Input
              style={{
                marginBottom: '20px',
                margin: '4px',
                width: '400px',
                border: '1px solid #ACACAC',
                fontSize: '14px',
              }}
              onInput={(e) => setPassword(e.target.value)}
              name='textInput'
              placeholder='Enter password'
              label='Password'
              inputType='password'
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  logIn()
                }
              }}
              required
            />

            <CG.Body size='S'>{errorMessage}</CG.Body>
            <CG.Button text='Login' onClick={logIn} />
            <CG.Box display='flex'>
              <CG.Body size='S'>Don't have an account yet? </CG.Body>
              <a href='/register' size='S'>
                Sign up
              </a>
              <CG.Box> </CG.Box>
            </CG.Box>
          </CG.Box>
        </Col>
      </Row>
    </Col>
  )
}

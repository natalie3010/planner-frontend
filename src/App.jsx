import React from 'react'
import { CG } from 'cap-shared-components'
import { Login } from './Containers/Login'
import { Container } from 'react-grid-system'

export const App = () => {
  return (
    <Container fluid>
     
      <Login />
    </Container>
  )
}

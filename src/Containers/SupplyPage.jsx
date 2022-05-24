import React from 'react'

import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { Col, Row } from 'react-grid-system'

import { CG } from 'cap-shared-components'

export const SupplyPage = () => {
  return (
    <Row justify='between'>
      <Col md={12} align='center' justify='center'>
        <Navigation />
        <div>
          <CG.Heading>Add a new supply</CG.Heading>
          <CG.Container>
            <CG.Input label={'Name'} />
            <CG.Input label={'Last name'} />
            <CG.Input label={'Notes'} />
            <CG.Input label={'Location'} />
            <CG.Button
              text='submit'
              onClick={() => {
                console.log('submitteeeed')
              }}
            />
            <CG.Button text='cancel' />
          </CG.Container>
        </div>
        <Footer />
      </Col>
    </Row>
  )
}

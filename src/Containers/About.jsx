import React from 'react'
import { Row, Col } from 'react-grid-system'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'

import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'

export const About = () => {
  const navigate = useNavigate()
  return (
    <div style={{ height: '1000px' }}>
      <Navigation />
      <div style={{ padding: 20 }}>
        <Row>
          <Col style={{ padding: '20', width: '50%', display: 'block', float: 'left' }}>
            <CG.Heading size='M' weight='bold' margin='10px'>
              Helping millions grow better.
            </CG.Heading>

            <img src='/images/thames-g77b9e635d_1280.jpg' width='100%' height='300' alt='pic' />

            <CG.Heading size='S' weight='bold' marginBottom='10px' style={{ marginBottom: '10px' }}>
              Our Mission
            </CG.Heading>
            <CG.Body size='M'>
              The supply and demand app is used to centralise the request coming from a customer to get a new resource.
            </CG.Body>
            <CG.Body size='M'>The request is the demand and the new resource recruited is the supply.</CG.Body>
          </Col>
          <Col style={{ padding: '20', width: '50%', display: 'block', float: 'right' }}>
            <CG.Heading size='M' weight='bold'>
              Get in touch
            </CG.Heading>

            <CG.Heading size='S' weight='bold'>
              Contact customer support
            </CG.Heading>
            <CG.Body size='M'>
              Sometimes you need a little help from your friends. Or a hubspot support rep. Don't worry...we're here for
              you.
            </CG.Body>
            <CG.Body size='M'>+44 7444999999</CG.Body>

            <CG.Heading size='XS' weight='bold'>
              London (UK Office)
            </CG.Heading>
            <CG.Heading size='XS' weight='bold'>
              Address
            </CG.Heading>
            <CG.Body size='M'>40 Holborn Viaduct, </CG.Body>
            <CG.Body size='M'> London,</CG.Body>
            <CG.Body size='M'>EC1N 2PB</CG.Body>
            <CG.Heading size='XS' weight='bold'>
              Phone
            </CG.Heading>
            <CG.Body size='M'>+44 99999999</CG.Body>
          </Col>
        </Row>
      </div>

      <Footer />
    </div>
  )
}

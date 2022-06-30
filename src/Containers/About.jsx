import React from 'react'
import { Row, Col } from 'react-grid-system'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'

import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'

export const About = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Navigation />
      <div style={{ padding: 20 }}>
        <Row>
          <Col style={{ padding: '20', width: '50%', display: 'block', float: 'left' }}>
            <CG.Body size='XL' fontWeight='bold' style={{ marginBottom: '10px' }}>
              Helping millions grow better.
            </CG.Body>

            <img src='/images/thames-g77b9e635d_1280.jpg' width='100%' height='300' alt='pic' />

            <CG.Body size='L' fontWeight='bold' style={{ marginBottom: '10px', marginTop: '10px' }}>
              Our Mission
            </CG.Body>
            <CG.Body size='M'>
              The supply and demand app is used to centralise the request coming from a customer to get a new resource.
            </CG.Body>
            <CG.Body size='M'>The request is the demand and the new resource recruited is the supply.</CG.Body>
          </Col>
          <Col style={{ padding: '20', width: '50%', display: 'block', float: 'right' }}>
            <CG.Body size='XL' fontWeight='bold' style={{ marginBottom: '10px' }}>
              Get in touch
            </CG.Body>

            <CG.Body size='L' fontWeight='bold' style={{ marginBottom: '10px' }}>
              Contact customer support
            </CG.Body>
            <CG.Body size='M'>
              Sometimes you need a little help from your friends. Or a hubspot support rep. Don't worry...we're here for
              you.
            </CG.Body>
            <CG.Body size='M' style={{ marginBottom: '0' }}>
              +44 7444999999
            </CG.Body>

            <CG.Body size='L' fontWeight='bold' style={{ marginTop: '10px', marginBottom: '10px' }}>
              London (UK Office)
            </CG.Body>
            <CG.Body size='L' fontWeight='bold' style={{ marginTop: '0', marginBottom: '10px' }}>
              Address
            </CG.Body>
            <CG.Body size='M'>40 Holborn Viaduct, </CG.Body>
            <CG.Body size='M'> London,</CG.Body>
            <CG.Body size='M' style={{ marginBottom: '0' }}>
              EC1N 2PB
            </CG.Body>
            <CG.Body size='L' fontWeight='bold' style={{ marginBottom: '10px', marginTop: '10px' }}>
              Phone
            </CG.Body>
            <CG.Body size='M'>+44 99999999</CG.Body>
          </Col>
        </Row>
      </div>

      <Footer />
    </div>
  )
}

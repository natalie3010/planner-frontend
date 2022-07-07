import React from 'react'
import { Row, Col } from 'react-grid-system'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'

import { CG } from 'cap-shared-components'

export const About = () => {
  return (
    <div>
      <Navigation />
      <Row justify='between'>
        <Col md={12} align='center' justify='center'>
          <Col md={10} style={{ marginBottom: 20 }} align='center' justify='center'>
            <CG.Heading size='M' weight='bold'>
              About us
            </CG.Heading>
          </Col>
        </Col>
      </Row>

      <div style={{ padding: '20px' }}>
        <Row>
          <Col style={{ padding: '20', width: '50%', display: 'block', float: 'left' }}>
            <CG.Body size='L' fontWeight='bold'>
              {' '}
              How to use the website
            </CG.Body>
            <CG.Body size='L' fontWeight='bold'>
              Add a supply
            </CG.Body>
            <CG.Body size='M'>
              To add a supply click on the add supply button on the homepage and fill in the required information on the
              form and then click on the submit button. The supply will then be added to the bar chart on the homepage.{' '}
            </CG.Body>
            <CG.Body size='L' fontWeight='bold'>
              Add a demand
            </CG.Body>
            <CG.Body size='M'>
              To add a demand click on the add demand button on the homepage and fill in the required information on the
              form and then click on the submit button. The demand will then be added to the bar chart on the homepage.{' '}
            </CG.Body>

            <CG.Body size='L' fontWeight='bold'>
              View the supply information
            </CG.Body>
            <CG.Body size='M'>
              To view the supply information click on a green bar on the bar chart on the homepage for a certain skill
              and it will take you to the supply information page for that particular skill and show all of the supply
              information in a table.{' '}
            </CG.Body>
            <CG.Body size='L' fontWeight='bold'>
              View the demand information
            </CG.Body>
            <CG.Body size='M'>
              To view the demand information click on an orange bar on the bar chart on the homepage for a certain skill
              and it will take you to the supply information page for that particular skill and show all of the supply
              information in a table.{' '}
            </CG.Body>
            <CG.Body size='L' fontWeight='bold'>
              Edit a supply
            </CG.Body>
            <CG.Body size='M'>
              To edit the supply information click on the edit button on the supply information page for the particular
              supply which you want to edit. Then edit the information in the form and click on the submit button and
              the information will be updated.
            </CG.Body>
            <CG.Body size='L' fontWeight='bold'>
              Edit a demand
            </CG.Body>
            <CG.Body size='M'>
              To edit the demand information click on the edit button on the demand information page for the particular
              supply which you want to edit. Then edit the information in the form and click on the submit button and
              the information will be updated.
            </CG.Body>
            <CG.Body size='L' fontWeight='bold'>
              Delete a supply
            </CG.Body>
            <CG.Body size='M'>
              To delete a supply from the supply information table click on the delete button for the row of data which
              you want to delete and it will be removed from the table and from the database and from the bar chart on
              the homepage.
            </CG.Body>
            <CG.Body size='L' fontWeight='bold'>
              Delete a demand
            </CG.Body>
            <CG.Body size='M'>
              To delete a supply from the demand information table click on the delete button for the row of data which
              you want to delete and it will be removed from the table and from the database and from the bar chart on
              the homepage.
            </CG.Body>
          </Col>
          <Col style={{ padding: '20', width: '50%', display: 'block', float: 'right' }}>
            <CG.Body size='L' fontWeight='bold' style={{ marginBottom: '10px', marginTop: '10px' }}>
              Our Mission
            </CG.Body>
            <CG.Body size='M'>
              The supply and demand app is used to centralise the request coming from a customer to get a new resource.
            </CG.Body>
            <CG.Body size='M'>The request is the demand and the new resource recruited is the supply.</CG.Body>

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

            <CG.Body size='L' fontWeight='bold' style={{ marginBottom: '10px', marginTop: '10px' }}>
              Email address
            </CG.Body>
            <CG.Body size='M'>info@capgemini.com</CG.Body>

            <img
              src='/images/capgemini-FI-1.jpg'
              width='450px'
              height='300px'
              alt='pic'
              style={{ marginTop: '20px' }}
            />
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  )
}

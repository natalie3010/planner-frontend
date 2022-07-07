import React from 'react'
import { Row, Col } from 'react-grid-system'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'

import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'

export const About = () => {
  const navigate = useNavigate()
  return (
    <div style={{ height: '900px' }}>
      <Navigation />
      <div style={{ padding: 20 }}>
        <Row>
          <Col style={{ padding: '20', width: '50%', display: 'block', float: 'left' }}>
            <h1
              style={{
                fontFamily:
                  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                fontWeight: '200',
                marginTop: '20px',
                marginBottom: '20px',
                fontSize: '22pt',
                textAlign: 'center',
              }}
            >
              Helping millions grow better.
            </h1>
            <img src='/images/thames-g77b9e635d_1280.jpg' width='100%' height='300' alt='pic' />

            <h3
              style={{
                fontFamily:
                  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                fontWeight: '200',
                marginTop: '20px',
                marginBottom: '20px',
                fontSize: '18pt',
                textAlign: 'center',
              }}
            >
              Our Mission
            </h3>
            <p
              style={{
                fontSize: '1rem',
                fontFamily:
                  " -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                fontWeight: '400',
                lineHeight: '1.6rem',
                paddingLeft: '20px',
                paddingRight: '20px',
              }}
            >
              The supply and demand app is used to centralise the request coming from a customer to get a new resource.
            </p>
            <p
              style={{
                fontSize: '1rem',
                fontFamily:
                  " -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                fontWeight: '400',
                lineHeight: '1.6rem',
                paddingLeft: '20px',
                paddingRight: '20px',
              }}
            >
              The request is the demand and the new resource recruited is the supply.
            </p>
          </Col>
          <Col style={{ padding: '20', width: '50%', display: 'block', float: 'right' }}>
            <div style={{ textAlign: 'center' }}>
              <h1
                style={{
                  fontFamily:
                    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  fontWeight: '200',
                  marginTop: '20px',
                  marginBottom: '20px',
                  fontSize: '22pt',
                }}
              >
                Get in touch
              </h1>
              <h3
                style={{
                  fontFamily:
                    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  fontWeight: '200',
                  marginTop: '20px',
                  marginBottom: '20px',
                  fontSize: '18pt',
                }}
              >
                Contact customer support
              </h3>
              <p
                style={{
                  fontSize: '1rem',
                  fontFamily:
                    " -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  fontWeight: '400',
                  lineHeight: '1.6rem',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                }}
              >
                Sometimes you need a little help from your friends. Or a hubspot support rep. Don't worry...we're here
                for you.
              </p>
              <p
                style={{
                  fontSize: '1rem',
                  fontFamily:
                    " -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  fontWeight: '400',
                  lineHeight: '1.6rem',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                }}
              >
                +44 7444999999
              </p>
            </div>
            <h4
              style={{
                fontFamily:
                  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                fontWeight: '200',
                marginTop: '20px',
                marginBottom: '20px',
                fontSize: '16pt',
              }}
            >
              London (UK Office)
            </h4>
            <h4
              style={{
                fontFamily:
                  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                fontWeight: '200',
                marginTop: '20px',
                marginBottom: '20px',
                fontSize: '16pt',
              }}
            >
              Address
            </h4>
            <p
              style={{
                fontSize: '1rem',
                fontFamily:
                  " -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                fontWeight: '400',
                lineHeight: '1.6rem',
              }}
            >
              40 Holborn Viaduct, London EC1N 2PB
            </p>
            <h4
              style={{
                fontFamily:
                  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                fontWeight: '200',
                marginTop: '20px',
                marginBottom: '20px',
                fontSize: '16pt',
              }}
            >
              Phone
            </h4>
            <p
              style={{
                fontSize: '1rem',
                fontFamily:
                  " -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                fontWeight: '400',
                lineHeight: '1.6rem',
              }}
            >
              +44 99999999
            </p>
          </Col>
        </Row>
      </div>

      <Footer />
    </div>
  )
}

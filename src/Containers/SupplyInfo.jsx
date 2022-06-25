import React, { useState, useEffect, useContext } from 'react'
import { myContext } from '../index'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'

export const Information = () => {
  const token = useContext(myContext).state.authToken
  console.log(token)
  const requestObject = { method: 'GET', headers: { 'x-access-token': token } }
  const [data, getData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = (skill_name) => {
    fetch('https://localhost:4001/api/supply?selectedSkills=skill_name', requestObject)
      .then((res) => res.json())

      .then((response) => {
        console.log(response)
        getData(response)
      })
  }

  return (
    <div style={{ textAlign: 'center', height: '900px' }}>
      <Navigation />
      <div style={{ textAlign: 'center' }}>
        <CG.Heading>Supply information</CG.Heading>
        <table
          style={{
            padding: '15px',
            backgroundColor: ' var(--bs-table-bg)',
            borderBottomWidth: '1px',
            boxShadow: 'inset 0 0 0 9999px var(--bs-table-accent-bg)',
            textAlign: 'center',
            fontWeight: '400',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <tbody>
            <tr style={{ borderColor: 'inherit', borderStyle: 'solid', borderWidth: '0', width: '100%' }}>
              <th
                style={{
                  padding: '15px',
                  borderColor: 'inherit',
                  borderStyle: 'solid',
                  borderWidth: '0',
                  borderBottom: '1.5px solid #000',
                  color: '#747474',
                  fontWeight: '400',
                  lineHeight: '18px',
                  fontSize: '12px',
                  fontFamily:
                    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  width: '10%',
                }}
              >
                Applicant ID
              </th>
              <th
                style={{
                  padding: '15px',
                  borderColor: 'inherit',
                  borderStyle: 'solid',
                  borderWidth: '0',
                  borderBottom: '1.5px solid #000',
                  color: '#747474',
                  fontWeight: '400',
                  lineHeight: '18px',
                  fontSize: '12px',
                  fontFamily:
                    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  width: '10%',
                }}
              >
                First name
              </th>
              <th
                style={{
                  padding: '15px',
                  borderColor: 'inherit',
                  borderStyle: 'solid',
                  borderWidth: '0',
                  borderBottom: '1.5px solid #000',
                  color: '#747474',
                  fontWeight: '400',
                  lineHeight: '18px',
                  fontSize: '12px',
                  fontFamily:
                    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  width: '10%',
                }}
              >
                Surname
              </th>
              <th
                style={{
                  padding: '15px',
                  borderColor: 'inherit',
                  borderStyle: 'solid',
                  borderWidth: '0',
                  borderBottom: '1.5px solid #000',
                  color: '#747474',
                  fontWeight: '400',
                  lineHeight: '18px',
                  fontSize: '12px',
                  fontFamily:
                    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  width: '10%',
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: '15px',
                  borderColor: 'inherit',
                  borderStyle: 'solid',
                  borderWidth: '0',
                  borderBottom: '1.5px solid #000',
                  color: '#747474',
                  fontWeight: '400',
                  lineHeight: '18px',
                  fontSize: '12px',
                  fontFamily:
                    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  width: '10%',
                }}
              >
                Skills ID
              </th>
              <th
                style={{
                  padding: '15px',
                  borderColor: 'inherit',
                  borderStyle: 'solid',
                  borderWidth: '0',
                  borderBottom: '1.5px solid #000',
                  color: '#747474',
                  fontWeight: '400',
                  lineHeight: '18px',
                  fontSize: '12px',
                  fontFamily:
                    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  width: '10%',
                }}
              >
                Notes
              </th>
              <th
                style={{
                  padding: '15px',
                  borderColor: 'inherit',
                  borderStyle: 'solid',
                  borderWidth: '0',
                  borderBottom: '1.5px solid #000',
                  color: '#747474',
                  fontWeight: '400',
                  lineHeight: '18px',
                  fontSize: '12px',
                  fontFamily:
                    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  width: '10%',
                }}
              >
                Applicant type
              </th>
              <th
                style={{
                  padding: '15px',
                  borderColor: 'inherit',
                  borderStyle: 'solid',
                  borderWidth: '0',
                  borderBottom: '1.5px solid #000',
                  color: '#747474',
                  fontWeight: '400',
                  lineHeight: '18px',
                  fontSize: '12px',
                  fontFamily:
                    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  width: '10%',
                }}
              >
                Location
              </th>
            </tr>
            {data.map((item, i) => (
              <tr key={i}>
                <td
                  style={{
                    padding: '15px',
                    borderColor: 'inherit',
                    borderStyle: 'solid',
                    borderWidth: '0',
                    display: 'table-cell',
                    verticalAlign: 'inherit',
                    borderRight: '1.5px solid #EFEFEF',
                    borderLeft: '1.5px solid #EFEFEF',
                    borderBottom: '1.5px solid #EFEFEF',
                    color: '#505050',
                    fontSize: '14px',
                    fontFamily:
                      "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  }}
                >
                  {item.ApplicantID}
                </td>
                <td
                  style={{
                    padding: '15px',
                    borderColor: 'inherit',
                    borderStyle: 'solid',
                    borderWidth: '0',
                    display: 'table-cell',
                    verticalAlign: 'inherit',
                    borderRight: '1.5px solid #EFEFEF',
                    borderLeft: '1.5px solid #EFEFEF',
                    borderBottom: '1.5px solid #EFEFEF',
                    color: '#505050',
                    fontSize: '14px',
                    fontFamily:
                      "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  }}
                >
                  {item.ApplicantFirstName}
                </td>
                <td
                  style={{
                    padding: '15px',
                    borderColor: 'inherit',
                    borderStyle: 'solid',
                    borderWidth: '0',
                    display: 'table-cell',
                    verticalAlign: 'inherit',
                    borderRight: '1.5px solid #EFEFEF',
                    borderLeft: '1.5px solid #EFEFEF',
                    borderBottom: '1.5px solid #EFEFEF',
                    color: '#505050',
                    fontSize: '14px',
                    fontFamily:
                      "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  }}
                >
                  {item.ApplicantLastName}
                </td>
                <td
                  style={{
                    padding: '15px',
                    borderColor: 'inherit',
                    borderStyle: 'solid',
                    borderWidth: '0',
                    display: 'table-cell',
                    verticalAlign: 'inherit',
                    borderRight: '1.5px solid #EFEFEF',
                    borderLeft: '1.5px solid #EFEFEF',
                    borderBottom: '1.5px solid #EFEFEF',
                    color: '#505050',
                    fontSize: '14px',
                    fontFamily:
                      "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  }}
                >
                  {item.ApplicantStatus}
                </td>
                <td
                  style={{
                    padding: '15px',
                    borderColor: 'inherit',
                    borderStyle: 'solid',
                    borderWidth: '0',
                    display: 'table-cell',
                    verticalAlign: 'inherit',
                    borderRight: '1.5px solid #EFEFEF',
                    borderLeft: '1.5px solid #EFEFEF',
                    borderBottom: '1.5px solid #EFEFEF',
                    color: '#505050',
                    fontSize: '14px',
                    fontFamily:
                      "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  }}
                >
                  {item.SkillsID}
                </td>
                <td
                  style={{
                    padding: '15px',
                    borderColor: 'inherit',
                    borderStyle: 'solid',
                    borderWidth: '0',
                    display: 'table-cell',
                    verticalAlign: 'inherit',
                    borderRight: '1.5px solid #EFEFEF',
                    borderLeft: '1.5px solid #EFEFEF',
                    borderBottom: '1.5px solid #EFEFEF',
                    color: '#505050',
                    fontSize: '14px',
                    fontFamily:
                      "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  }}
                >
                  {item.Notes}
                </td>
                <td
                  style={{
                    padding: '15px',
                    borderColor: 'inherit',
                    borderStyle: 'solid',
                    borderWidth: '0',
                    display: 'table-cell',
                    verticalAlign: 'inherit',
                    borderRight: '1.5px solid #EFEFEF',
                    borderLeft: '1.5px solid #EFEFEF',
                    borderBottom: '1.5px solid #EFEFEF',
                    color: '#505050',
                    fontSize: '14px',
                    fontFamily:
                      "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  }}
                >
                  {item.ApplicantType}
                </td>
                <td
                  style={{
                    padding: '15px',
                    borderColor: 'inherit',
                    borderStyle: 'solid',
                    borderWidth: '0',
                    display: 'table-cell',
                    verticalAlign: 'inherit',
                    borderRight: '1.5px solid #EFEFEF',
                    borderLeft: '1.5px solid #EFEFEF',
                    borderBottom: '1.5px solid #EFEFEF',
                    color: '#505050',
                    fontSize: '14px',
                    fontFamily:
                      "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
                  }}
                >
                  {item.Location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '50px' }}>
          <CG.Button text='Return to dashboard' onClick={() => navigate('/dashboard')}></CG.Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

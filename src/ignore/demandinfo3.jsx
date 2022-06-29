import React, { useState, useEffect } from 'react'
import { Navigation } from '../Components/Navigation'
import { Footer } from '../Components/Footer'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export const DemandInformation = () => {
  let { skillname } = useParams()
  console.log(window.location.pathname)
  console.log(window.location.href)
  console.log(skillname)
  const token = useSelector((state) => state.user.authToken)
  console.log(token)
  const requestObject = { method: 'GET', headers: { 'x-access-token': token } }

  const [data, getData] = useState([])

  const navigate = useNavigate()
  useEffect(() => {
    fetchData()
  }, [skillname])

  const fetchData = () => {
    if (skillname === 'UI UX Designer') {
      let url = 'https://localhost:4001/api/demand?selectedSkills=UI/UX Designer'
      console.log(url)

      fetch(url, requestObject)
        .then((res) => res.json())

        .then((response) => {
          console.log(response)
          getData(response)
        })
    } else {
      let url = 'https://localhost:4001/api/demand?selectedSkills=' + skillname
      console.log(url)

      fetch(url, requestObject)
        .then((res) => res.json())

        .then((response) => {
          console.log(response)
          getData(response)
        })
    }
  }
  const deleterow = (i, e) => {
    getData(data.filter((v, index) => index !== i))
  }
  return (
    <div style={{ textAlign: 'center', height: '1200px' }}>
      <Navigation />
      <div style={{ textAlign: 'center' }}>
        <CG.Heading>Demand information for {skillname}</CG.Heading>
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
                Demand ID
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
                Code Requisition
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
                Client ID
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
                Probability
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
                Start Date
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
                Grade
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
                Actions
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
                  {item.DemandID}
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
                  {item.CodeRequisition}
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
                  {item.ClientID}
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
                  {item.Probability}
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
                  {item.StartDate}
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
                  {item.Grade}
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
                  {item.SelectedApplicantID}
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
                  {item.Status}
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
                  <a href='/edit-supply'>
                    <img src='/images/document-editor.png' width='16px' height='16px' alt='pic' />
                  </a>
                  <a onClick={(e) => deleterow(i, e)}>
                    <img src='/images/delete.png' width='16px' height='16px' alt='pic' />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '50px' }}>
          <CG.Button text='Return to dashboard' onClick={() => navigate('/protectedRoute/dashboard')}></CG.Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

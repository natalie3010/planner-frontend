import React from 'react'
import { CG } from 'cap-shared-components'
import { Row, Col } from 'react-grid-system'

const groupedData = {
  labels: ['React JS', 'Java', 'Kotlin', 'Node JS', 'Angular JS', 'AWS'],
  datasets: [
    {
      label: 'Supply',
      data: [7, 4, 3, 5, 2, 3],
      backgroundColor: '#268D6C',
      stack: 'Stack 0',
    },
    {
      label: 'Demand',
      data: [4, 1, 4, 8, 10, 3],
      backgroundColor: '#DA7B11',
      stack: 'Stack 1',
    },
  ],
}

const groupedOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

export const Dashboard = () => {
  return (
    <Row justify='between'>
      <Col md={12} align='center' justify='center'>
        {/* <CG.Heading weight='bold' size='S'>
          Dashboard page
        </CG.Heading> */}
        <CG.Navigation
          inputPlaceholder='Search'
          withButtons
          homeIcon={{
            type: 'Building',
            height: '26px',
            width: '26px',
          }}
          homeLink={{
            name: 'Workforce Planner',
            url: '/dashboard',
          }}
          buttons={[
            {
              buttonText: 'Contact Us',
              onClick: () => {},
            },
            {
              buttonText: 'Logout',
              onClick: () => {},
            },
          ]}
        />
        <Col md={10} style={{ marginBottom: 20 }} align='center' justify='center'>
        <CG.Heading size="M"  weight="bold">
          Skills Based On Supply and Demand
        </CG.Heading>
          <CG.BarChart data={groupedData} options={groupedOptions} />
        </Col>
        <CG.Footer copyright='Capgemini' />
      </Col>
    </Row>
  )
}

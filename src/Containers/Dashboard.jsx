import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-grid-system'
import { BarChart } from '../Components/BarChart'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { getAllDemand, getAllSupply, getSkills } from '../API'
import SideNavi from '../Components/SideNavi/SideNavi'

export const Dashboard = () => {
  const navigate = useNavigate()
  const [allDemand, setAllDemand] = useState(null)
  const [allSupply, setAllSupply] = useState(null)
  const [allSkills, setAllSkills] = useState(null)

  useEffect(() => {
    getAllDemand().then((data) => {
      setAllDemand(data)
    })
    getAllSupply().then((data) => {
      setAllSupply(data)
    })
    getSkills().then((data) => {
      setAllSkills(data)
    })
  }, [])
  const [showData, setShowData] = useState(false)
  const onChartClickNavigate = (page, skillID) => {
    // const name = skillName.replace(/\//g, '-')

    navigate(`/${page}/all/skill/${skillID}`)

    // navigate(`/list-${page}/${name}`)
  }

  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box width={1280} boxSizing='border-box' justifyContent='flex-end'>
        <Col md={11} align='center' justify='center'>
          <CG.Heading size='XS'>Skills Based On Supply and Demand</CG.Heading>

          <CG.Box justifyContent='flex-end' display='flex'>
            <a onClick={() => setShowData((prev) => !prev)}>
              <CG.Box
                width='160px'
                height='26px'
                borderRadius='13'
                position='relative'
                cursor='pointer'
                border='1px solid grey'
                boxSizing='border-box'
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                fontSize='13px'
                color='lightgrey'
                pl='15px'
                pr='15px'
                fontFamily='sans-serif'
              >
                <CG.Box>Clear all</CG.Box>
                <CG.Box>Select all</CG.Box>

                <CG.Box
                  width='50%'
                  height='103%'
                  borderRadius='13'
                  position='absolute'
                  backgroundcolor='black'
                  zIndex='-1'
                  right={showData && '0'}
                  left={!showData && '0'}
                  justifyContent='flex-end'
                ></CG.Box>
              </CG.Box>
            </a>
          </CG.Box>

          <CG.Box flexDirection='row' justifyContent='space-between'>
            <Row>
              <Col md={2} style={{ left: '-68px', top: '-54px', bottom: 'auto' }}>
                <SideNavi />
              </Col>

              <Col md={8}>
                {!allDemand || !allSupply || !allSkills ? (
                  <CG.Body>'loading...'</CG.Body>
                ) : (
                  <BarChart
                    navigateToListPage={onChartClickNavigate}
                    allDemand={showData ? allDemand : []}
                    allSupply={showData ? allSupply : []}
                    allSkills={showData ? allSkills : []}
                    style={{ flex: 1 }}
                  />
                )}
              </Col>
            </Row>
          </CG.Box>
        </Col>
      </CG.Box>
    </Col>
  )
}

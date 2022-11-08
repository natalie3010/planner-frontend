import React, { useEffect, useState } from 'react'
import { Col } from 'react-grid-system'
import { BarChart } from '../Components/BarChart'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
import { getAllDemand, getAllSupply, getSkills } from '../API'

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
  const onChartClickNavigate = (page, skillName) => {
    const name = skillName.replace(/\//g, '-')

    navigate(`/list-${page}/${name}`)
  }
  return (
    <Col md={12} align='center' justify='center'>
      <CG.Box width={400} boxSizing='border-box' justifyContent='flex-end' >
        <Col md={11} align='center' justify='center'>
          <CG.Heading size='XS'>Skills Based On Supply and Demand</CG.Heading>
          
    
<CG.Box justifyContent='flex-end' display='flex' >

        <div onClick={()=> setShowData(prev => !prev)} style={{
          width: '160px',
          height: '26px',
          borderRadius: '13px',
          position: 'relative',
          cursor: 'pointer', 
          border: '1px solid grey',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent:'space-between', 
          alignItems: 'center',
          fontSize: '15px', 
          color: 'lightgrey',
          padding: '5px'}} >
       

          <div>Clear All</div>
          <div>Select All</div>

          <div style={{
            width: '50%', 
            height: '99%',
            borderRadius: '13px',
            position: 'absolute',
            backgroundColor: 'black',
            zIndex: '-1',  
            right: showData && '0',
            left: !showData && '0', 
            justifyContent: 'flex-end'}} >
          </div>
</div>
</CG.Box>
          {!allDemand || !allSupply || !allSkills ? (
            <CG.Body>'loading...'</CG.Body>
            
          ) : (
            <BarChart
              navigateToListPage={onChartClickNavigate}
              allDemand = {showData ? allDemand: []}
              allSupply={showData ? allSupply: []}
              allSkills={showData ? allSkills: []}
            />
          )}

          <CG.Box boxSizing='border-box' display='flex' flexDirection='row' justifyContent='space-between'>
            <>
              <CG.Button text='Add a supply' onClick={() => navigate('/supply/new')}></CG.Button>
              <CG.Button text='List All Supply' onClick={() => navigate('/supply/all')}></CG.Button>
              <CG.Button text='List Clients' onClick={() => navigate('/clients/all')}></CG.Button>
              <CG.Button text='List All Demand' onClick={() => navigate('/demand/all')}></CG.Button>
              <CG.Button text='Add a demand' onClick={() => navigate('/demand/new')}></CG.Button>
            </>
          </CG.Box>
        </Col>
      </CG.Box>
    </Col>
  )
}

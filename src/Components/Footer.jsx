import React from 'react'
import { CG } from 'cap-shared-components'
import logo from './Assets/Capture.PNG'


export const Footer = () => {
  return (
    <CG.Footer style={{ marginTop: 'auto', backgroundColor: 'white'}}>
     
      <div>
        <a href='/workforcePlanner'>
        <img src={logo} alt="logo" style={{width: '94px', height: '30px', display: 'flex', alignItems: 'center', width: '94px',  left: '74px', top: '767px'}} />
        </a>
        
      </div>
    
    
    </CG.Footer>
  )
}

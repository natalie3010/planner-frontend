import React from 'react'
import { CG } from 'cap-shared-components'
import { useNavigate } from 'react-router-dom'
export const Navigation = () => {
  const navigate = useNavigate()
  return (
    <CG.NavbarContainer>
      <CG.NavbarContent>
        <CG.HomeLink
          homeLink={{ url: '?path=/story/template-cashorted--cashorted' }}
          homeIcon={{
            type: 'WorkforcePlanner',
            height: '50px',
            width: '200px',
          }}
        />
        <div style={{ alignSelf: 'center' }}>
          <CG.Button text='Home'  onClick={() => navigate('/dashboard')}/>
          <span> </span>
          <CG.Button text='Supply'  onClick={() => navigate('/supplyinfo')}/>
          <span> </span>
          <CG.Button text='Demand'  onClick={() => navigate('/demandinfo')}/>
          <span> </span>
          <CG.Button text='About'  onClick={() => navigate('/about')}/>
          <span> </span>
          <CG.Button text='Logout' />
        </div>
      </CG.NavbarContent>
    </CG.NavbarContainer>
  )
}

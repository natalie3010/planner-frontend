import {
  SideNavBar,
  SideNavButton,
  SideNavLink,
  SideNavLinkIcon,
  SideNavLinkLabel,
  SideNavLinkContainer,
} from './styles'
import menuIcon from '../Assets/menu.png'
import addSupplyIcon from '../Assets/addUser.png'
import listSupplyIcon from '../Assets/userList.png'
import listClientsIcon from '../Assets/clients.png'
import listAllDemandIcon from '../Assets/allDemand.png'
import addDemandIcon from '../Assets/addDemand.png'
import profiles from '../Assets/profiles.png'
import candidates from '../Assets/candidate.png'
import responses from '../Assets/responses.png'
import skills from '../Assets/skills.png'
import React, { useState } from 'react'

const SideNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <>
      <SideNavBar isOpen={sidebarOpen}>
        <SideNavButton justify='left' isOpen={sidebarOpen} onClick={() => setSidebarOpen((p) => !p)}>
          <img src={menuIcon} alt='logo' />
        </SideNavButton>

        <br />
        <br />
        {linksArray.map(({ icon, label, to }) => (
          <SideNavLinkContainer key={label}>
            <SideNavLink to={to}>
              <SideNavLinkIcon>{icon}</SideNavLinkIcon>
              {sidebarOpen && (
                <>
                  <SideNavLinkLabel>{label}</SideNavLinkLabel>
                </>
              )}
            </SideNavLink>
          </SideNavLinkContainer>
        ))}
      </SideNavBar>
    </>
  )
}

const linksArray = [
  {
    icon: <img src={addSupplyIcon} alt='logo' />,
    label: 'Add a supply',
    to: '/supply/new',
  },
  {
    icon: <img src={listSupplyIcon} alt='logo' />,
    label: 'List all supply',
    to: '/supply/all',
  },
  {
    icon: <img src={listClientsIcon} alt='logo' />,
    label: 'List clients',
    to: '/clients/all',
  },
  {
    icon: <img src={listAllDemandIcon} alt='logo' />,
    label: 'List all demand',
    to: '/demand/all',
  },
  {
    icon: <img src={addDemandIcon} alt='logo' />,
    label: 'Add a demand',
    to: '/demand/new',
  },
  {
    icon: <img src={profiles} alt='logo' />,
    label: 'Profiles',
    to: '',
  },
  {
    icon: <img src={candidates} alt='logo' />,
    label: 'Candidates',
    to: '',
  },
  {
    icon: <img src={responses} alt='logo' />,
    label: 'Responses',
    to: '',
  },
  {
    icon: <img src={skills} alt='logo' />,
    label: 'Skills',
    to: '',
  },
]

export default SideNav

import React from 'react'
import { SSideNav,SLink,SLinkIcon, SLinkLabel,SLinkContainer,SSideNavButton } from '../SideNavi/styles'
import Menuicon from '../Assets/Menu.png'
import Addsupplyicon from '../Assets/addUser.png'
import Listsupplyicon from '../Assets/userList.png'
import Listclientsicon from '../Assets/Clients.png'
import Listalldemandicon from '../Assets/allDemand.png'
import AddDemandicon from '../Assets/addDemand.png'
import Profiles from '../Assets/Profiles.png'
import Candidates from '../Assets/Candidate.png'
import Responses from '../Assets/Responses.png'
import Skills from '../Assets/Skills.png'


import { useState } from 'react'
const SideNavi = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>

    
    <SSideNav isOpen={sidebarOpen}>
      <>
      <SSideNavButton justify='left' isOpen={sidebarOpen} onClick={() => setSidebarOpen((p)=> !p)}>
      <img style={{ justifyContent: 'left' }}  src={Menuicon} alt="logo" />
      </SSideNavButton>
      </>
      {linksArray.map(({icon,label,to})=>(
      <SLinkContainer key={label}>
      <SLink to={to} style={!sidebarOpen ? { } : {}}>
        <SLinkIcon>{icon}</SLinkIcon>
        {sidebarOpen && (
        <>
        <SLinkLabel>{label}</SLinkLabel>
        </>
        )}
      </SLink>
      </SLinkContainer>
        
      ))}


    </SSideNav>
       
</>
  )
}

const linksArray =  [
  {
  
    icon: <img src={ Addsupplyicon} alt="logo" />,
      label: "Add a supply",
      to: "/supply/new",
  },
  {
    icon:<img src={Listsupplyicon} alt="logo" />,
      label: "List all supply",
      to: "/supply/all",
  },
  {
    icon:<img src={Listclientsicon} alt="logo" />,
      label: "List clients",
      to: "/clients/all",
  },
  {
    icon:<img src={Listalldemandicon} alt="logo" />,
      label: "List all demand",
      to: "/demand/all",
  },
  {
    icon:<img src={AddDemandicon} alt="logo" />,
      label: "Add a demand",
      to: "/demand/new",
  },
  {
    icon:<img src={Profiles} alt="logo" />,
      label: "Profiles",
      to: "",
  },
  {
    icon:<img src={Candidates} alt="logo" />,
      label: "Candidates",
      to: "",
  },
  {
    icon:<img src={Responses} alt="logo" />,
      label: "Responses",
      to: "",
  },
  {
    icon:<img src={Skills} alt="logo" />,
      label: "Skills",
      to: "",
  },
  
];


export default SideNavi

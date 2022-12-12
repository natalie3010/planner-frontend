import styled from 'styled-components'
import { Link } from "react-router-dom";
import { v, btnReset } from '/themes/variables.js'

export const SSideNav = styled.div`
width: ${({ isOpen }) => (!isOpen ? `` : v.sidebarWidth)};
  boxShadow: ${({ theme }) => theme};

  height: 600px;
  padding: ${v.lgSpacing};
  position: relative;
`
export const SSideNavButton = styled.button`
    ${btnReset};
    padding: ${v.smSpacing} ${v.mdSpacing};
    display: flex;

    cursor: pointer;
    justify-content: left;
    transform: ${({ isOpen }) => (!isOpen ? `rotate(180deg)` : `initial`)};

`;

export const SLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    font-size: 16px;
    justify-content: left;

`;

export const SLinkIcon = styled.div`
    padding: ${v.smSpacing} ${v.mdSpacing};
    display: flex;
    png {
        font-size: 20px;
    }

`;

export const SLinkLabel = styled.span`
padding: ${v.smSpacing} ${v.mdSpacing};
display: flex;
    align-items: left;
    justify-content: left;


`;

export const SLinkContainer = styled.div`
    background: ${({ theme, isActive }) => (!isActive ? `transparent` : theme)};
    margin: 8px 0;
    :hover {
      background-color:${'#12ABDB29'};
    }
    justify-content: left;

`;


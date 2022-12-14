import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { WorkforcePlanner } from '../../../themes/workforcePlanner'

export const SSideNav = styled.div`
  width: ${({ isOpen }) => isOpen && WorkforcePlanner.spacing.sidebarWidth};
  boxshadow: ${({ theme }) => theme};

  height: 600px;
  padding: ${WorkforcePlanner.spacing.lgSpacing};
  position: relative;
`

export const SSideNavButton = styled.button`
  top: ${WorkforcePlanner.spacing.xxlSpacing};
  position: absolute;

  ${WorkforcePlanner.btnReset};
  padding: ${WorkforcePlanner.spacing.smSpacing};
  display: flex;

  cursor: pointer;
  justify-content: left;
`

export const SLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 16px;
  justify-content: left;
`

export const SLinkIcon = styled.div`
  padding: ${WorkforcePlanner.spacing.smSpacing} ${WorkforcePlanner.spacing.mdSpacing};
  display: flex;
`

export const SLinkLabel = styled.span`
  padding: ${WorkforcePlanner.spacing.smSpacing} ${WorkforcePlanner.spacing.mdSpacing};
  display: flex;
  align-items: left;
  justify-content: left;
`

export const SLinkContainer = styled.div`
  background: ${({ theme, isActive }) => theme.color.disabled};
  margin: 8px 0;
  :hover {
    background-color: ${'#12ABDB29'};
  }
  justify-content: left;
`

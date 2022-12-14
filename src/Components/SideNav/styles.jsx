import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { WorkforcePlanner } from '../../../themes/workforcePlanner'

export const SideNavBar = styled.div`
  width: ${({ isOpen }) => isOpen && WorkforcePlanner.spacing.sidebarWidth};
  boxshadow: ${({ theme }) => theme};
  height: 600px;
  padding: ${({ theme }) => theme.spacing.lgSpacing};
  position: relative;
`

export const SideNavButton = styled.button`
  top: ${({ theme }) => theme.spacing.xxlSpacing};
  position: absolute;
  ${({ theme }) => theme.btnReset}
  padding: ${({ theme }) => theme.spacing.smSpacing};
  display: flex;

  cursor: pointer;
  justify-content: left;
`

export const SideNavLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 16px;
  justify-content: left;
`

export const SideNavLinkIcon = styled.div`
  padding: ${({ theme }) => theme.spacing.smSpacing};
  display: flex;
`

export const SideNavLinkLabel = styled.span`
  padding: ${({ theme }) => theme.spacing.smSpacing};
  display: flex;
  align-items: left;
  justify-content: left;
`

export const SideNavLinkContainer = styled.div`
  background: ${({ theme }) => theme.color.disabled};
  margin: 8px 0;
  :hover {
    background-color: ${({ theme }) => theme.color.sideNavHover};
  }
  justify-content: left;
`

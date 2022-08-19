import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    dashboardData: null,
    clientData: [],
    selectClient: null,
  },
  reducers: {
    setupDashboard: (state, action) => {
      state.dashboardData = action.payload
    },
    setupClients: (state, action) => {
      state.clientData = action.payload
    },
    addSupplyToDashboard: (state, action) => {
      const skillName = action.payload
      state.dashboardData.filter((skill) => skill.skill_name === skillName)[0].supply_count += 1
    },
    removeSupplyFromDashboard: (state, action) => {
      const skillName = action.payload
      state.dashboardData.filter((skill) => skill.skill_name === skillName)[0].supply_count -= 1
    },
    addDemandToDashboard: (state, action) => {
      const skillName = action.payload
      state.dashboardData.filter((skill) => skill.skill_name === skillName)[0].demand_count += 1
    },
    removeDemandFromDashboard: (state, action) => {
      const skillName = action.payload
      state.dashboardData.filter((skill) => skill.skill_name === skillName)[0].demand_count -= 1
    },
    selectClientID: (state, action) => {
      const clientID = action.payload
      state.selectedClient = clientID
    },
    removeClient: (state, action) => {
      const clientName = action.payload
      state.clientData = state.clientData.filter((client) => client.ClientID !== clientName)
    },
  },
})

export const {
  setupDashboard,
  setupClients,
  addSupplyToDashboard,
  removeSupplyFromDashboard,
  addDemandToDashboard,
  removeDemandFromDashboard,
  selectClientID,
  removeClient,
} = dashboardSlice.actions

export default dashboardSlice.reducer

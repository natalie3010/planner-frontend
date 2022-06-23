import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    dashboardData: null,
    selectedApplicant: 32,
  },
  reducers: {
    setupDashboard: (state, action) => {
      state.dashboardData = action.payload
    },
    addSupplyToDashboard: (state, action) => {
      const skillName = action.payload
      state.dashboardData.filter((skill) => skill.skill_name === skillName)[0].supply_count += 1
    },
    removeSupplyFromDashboard: (state, action) => {
      const skillName = action.payload
      state.dashboardData.filter((skill) => skill.skill_name === skillName)[0].supply_count -= 1
    },
  },
})

export const { setupDashboard, addSupplyToDashboard, removeSupplyFromDashboard } = dashboardSlice.actions

export default dashboardSlice.reducer

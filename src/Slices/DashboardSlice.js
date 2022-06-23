import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    dashboardData: null,
    selectedApplicant: 53,
  },
  reducers: {
    setupDashboard: (state, action) => {
      state.dashboardData = action.payload
    },
    addSupplyToDashboard: (state, action) => {
      state.dashboardData[action.payload].supply_count += 1
    },
    removeSupplyFromDashboard: (state, action) => {
      state.dashboardData[action.payload].supply_count -= 1
    },
  },
})

export const { setupDashboard, addSupplyToDashboard, removeSupplyFromDashboard } = dashboardSlice.actions

export default dashboardSlice.reducer

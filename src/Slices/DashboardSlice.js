import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    dashboardData: null,
  },
  reducers: {
    setupDashboard: (state, action) => {
      state.dashboardData = action.payload
    },
  },
})

export const { setupDashboard } = dashboardSlice.actions

export default dashboardSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/LoginSlice'
import dashboardReducer from './Slices/DashboardSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
  },
})

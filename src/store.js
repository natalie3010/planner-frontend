import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './Slices/LoginSlice'
import dashboardReducer from './Slices/DashboardSlice'

const rootReducer = combineReducers({
  user: userReducer,
  dashboard: dashboardReducer,
})

export const setupStore = preloadedState => configureStore({
  reducer: rootReducer,
  preloadedState
})

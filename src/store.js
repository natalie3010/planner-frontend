import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/LoginSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

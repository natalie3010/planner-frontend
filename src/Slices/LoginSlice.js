import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userLoggedIn: false,
  authToken: null,
  pathname: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.userLoggedIn = false
    },
    login: (state, action) => {
      state.userLoggedIn = true
      state.authToken = action.payload
    },
    userNotLoggedIn: (state, action) => {
      state.pathname = action.payload
    },
  },
})

export const { logout, login, userNotLoggedIn } = userSlice.actions

export default userSlice.reducer

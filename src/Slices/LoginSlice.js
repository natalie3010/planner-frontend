import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userLoggedIn: false,
  user: null,
  pathname: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.userLoggedIn = false
      state.user = null
    },
    login: (state, action) => {
      state.userLoggedIn = true
      state.user = action.payload
    },
    userNotLoggedIn: (state, action) => {
      state.pathname = action.payload
    },
  },
})

export const { logout, login, userNotLoggedIn } = userSlice.actions

export default userSlice.reducer

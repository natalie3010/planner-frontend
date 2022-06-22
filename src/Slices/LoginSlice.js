import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userLoggedIn: false,
  authToken: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userLoggedIn = false
    },
    login: (state, action) => {
      state.userLoggedIn = true
      state.authToken = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { logout, login } = userSlice.actions
/**
 * We export the action creators as named exports
 */
export default userSlice.reducer

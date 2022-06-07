function loginReducer(state, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, isLoggedIn: true, authToken: action.authToken, refreshToken: action.refreshToken }
    case 'USER_LOGOUT':
      return { isLoggedIn: false }
    case 'New_TOKEN':
      return { ...state, authToken: action.authToken }
    default:
      return state
  }
}

export default loginReducer

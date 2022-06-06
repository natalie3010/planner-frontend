function loginReducer(state, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      console.log('Login Reducer' + JSON.stringify({ ...state, isLoggedIn: true, authToken: action.authToken }))
      return { ...state, isLoggedIn: true, authToken: action.authToken }
    case 'New_TOKEN':
      console.log('Token Reducer' + JSON.stringify({ ...state, authToken: action.authToken }))
      return { ...state, authToken: action.authToken }
    default:
      return state
  }
}

export default loginReducer

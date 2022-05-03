
function loginReducer(state, action) {
    switch (action.type) {
      case 'USER_LOGIN':
          console.log("Login Reducer" + JSON.stringify({...state, isLoggedIn:true}))
        return {...state, isLoggedIn:true};
      default:
        return state;
    }
  }

  export default loginReducer;
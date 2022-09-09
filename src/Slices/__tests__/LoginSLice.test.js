import reducer, { login, logout, userNotLoggedIn } from '../LoginSlice'

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual(
    {   userLoggedIn: false,
        authToken: null,
        pathname: null, }
  )
})

test('should handle login action', () => {
  const previousState = {  pathname: null}

  expect(reducer(previousState, login('test-token'))).toEqual(
    { userLoggedIn: true,
        authToken: 'test-token',
        pathname: null }
  )
})

test('should handle logout action', () => {
  const previousState = { userLoggedIn: true, authToken: 'test-token', pathname: null }

  expect(reducer(previousState, logout())).toEqual({userLoggedIn: false,
    authToken: 'test-token',
    pathname: null})
})

test('should handle userNotLoggedIn action', () => {
    const previousState = { pathname: '/Dashboard' }
  
    expect(reducer(previousState, userNotLoggedIn('/login'))).toEqual({pathname: '/login'})
  })
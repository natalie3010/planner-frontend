import { useState, useEffect } from 'react'
import { getNewToken } from '../API'

const useRefreshToken = () => {
  const [authToken, setAuthToken] = useState(null)
  const refreshToken = localStorage.getItem('refreshToken')
  const loginTime = localStorage.getItem('loginTime')
  const tokenExpireTime = 14 * 60 * 1000 + parseInt(loginTime)
  const currentTime = Date.now()

  useEffect(() => {
    if (currentTime > tokenExpireTime) {
      getNewToken(refreshToken).then((result) => {
        setAuthToken(result.token)
        localStorage.setItem('authToken', result.token)
        localStorage.setItem('loginTime', currentTime)
      })
    }
  })

  return authToken
}

export default useRefreshToken

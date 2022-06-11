export function submitUserLogin(username, password) {
  const data = { username: username, password: btoa(password) }
  const requestObject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  return fetch('https://localhost:4001/auth/login ', requestObject)
    .then((res) => {
      if (!res.ok) {
        throw res
      }
      return res.json()
    })
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error.status
    })
}

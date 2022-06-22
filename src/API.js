const URL = 'https://localhost:4001/'

export function submitUserLogin(username, password) {
  const data = { username: username, password: btoa(password) }
  const requestObject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  return fetch(`${URL}auth/login`, requestObject)
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

export function getDashboard(token) {
  const requestObject = { method: 'GET', headers: { 'x-access-token': token } }
  return fetch(`${URL}api/dashboard`, requestObject)
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

export function addSupply(token, data) {
  const requestObject = {
    method: 'POST',
    headers: {
      'x-access-token': token,
    },
    body: JSON.stringify(data),
  }
  return fetch(`${URL}api/supply`, requestObject)
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
      return error
    })
}

export function getSingleSupply(applicantID, token) {
  const requestObject = { method: 'GET', headers: { 'x-access-token': token } }
  return fetch(`${URL}api/supply/${applicantID}`, requestObject)
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

export function updateSupply(token, applicantID, data) {
  const requestObject = {
    method: 'PUT',
    headers: {
      'x-access-token': token,
    },
    body: JSON.stringify(data),
  }
  return fetch(`${URL}api/supply/${applicantID}`, requestObject)
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
      return error
    })
}

export function getSkills(token) {
  const requestObject = { method: 'GET', headers: { 'x-access-token': token } }
  return fetch(`${URL}api/skills`, requestObject)
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

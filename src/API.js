const URL = process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_URL : process.env.PRODUCTION_URL

export function submitUserLogin(username, password) {
  const data = { username: username, password: btoa(password) }
  const requestObject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  return fetch(`${URL}/auth/login`, requestObject)
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
  return fetch(`${URL}/api/dashboard`, requestObject)
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
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  return fetch(`${URL}/api/supply`, requestObject)
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

export function addDemand(token, data) {
  const requestObject = {
    method: 'POST',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  return fetch(`${URL}/api/demand`, requestObject)
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
export function getSingleClient(applicantID, token) {
  const requestObject = { method: 'GET', headers: { 'x-access-token': token } }
  return fetch(`${URL}/api/clients/${applicantID}`, requestObject)
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

export function getSingleSupply(applicantID, token) {
  const requestObject = { method: 'GET', headers: { 'x-access-token': token } }
  return fetch(`${URL}/api/supply/${applicantID}`, requestObject)
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

export function getSingleDemand(applicantID, token) {
  const requestObject = { method: 'GET', headers: { 'x-access-token': token } }
  return fetch(`${URL}/api/demand/${applicantID}`, requestObject)
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
export function updateClient(token, applicantID, data) {
  const requestObject = {
    method: 'PUT',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  return fetch(`${URL}/api/clients/${applicantID}`, requestObject)
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

export function updateSupply(token, applicantID, data) {
  const requestObject = {
    method: 'PUT',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  return fetch(`${URL}/api/supply/${applicantID}`, requestObject)
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

export function updateDemand(token, applicantID, data) {
  const requestObject = {
    method: 'PUT',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  return fetch(`${URL}/api/demand/${applicantID}`, requestObject)
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
  return fetch(`${URL}/api/skills`, requestObject)
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

export function getClients(token) {
  const requestObject = { method: 'GET', headers: { 'x-access-token': token } }
  return fetch(`${URL}/api/clients`, requestObject)
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

export function getDemandSkill(token, skillName) {
  const requestObject = { method: 'GET', headers: { 'x-access-token': token } }
  return fetch(`${URL}/api/demand?selectedSkills=${skillName}`, requestObject)
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

export function deleteDemand(token, demandId) {
  const requestObject = { method: 'DELETE', headers: { 'x-access-token': token } }
  return fetch(`${URL}/api/demand/${demandId}`, requestObject)
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

export function getSupplySkill(token, skillName) {
  const requestObject = { method: 'GET', headers: { 'x-access-token': token } }
  return fetch(`${URL}/api/supply?selectedSkills=${skillName}`, requestObject)
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

export function deleteSupply(token, supplyId) {
  const requestObject = { method: 'DELETE', headers: { 'x-access-token': token } }
  return fetch(`${URL}/api/supply/${supplyId}`, requestObject)
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

export function postClient(token, data) {
  const requestObject = {
    method: 'POST',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  return fetch(`${URL}/api/clients`, requestObject).then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
}

export function getNewToken(refreshToken) {
  const requestObject = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  }
  return fetch(`${URL}/auth/refresh-Token`, requestObject)
    .then((data) => {
      return data
    })

    .catch((error) => {
      return error.status
    })
}

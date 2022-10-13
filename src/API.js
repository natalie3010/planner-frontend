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

export function addSupply(data) {
  const requestObject = {
    method: 'POST',
    headers: {
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

export function addDemand(data) {
  const requestObject = {
    method: 'POST',
    headers: {
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

export function getSingleSupply(applicantID) {
  const requestObject = { method: 'GET'}
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

export function getSingleDemand(applicantID) {
  const requestObject = { method: 'GET' }
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
export function updateClient(applicantID, data) {
  const requestObject = {
    method: 'PUT',
    headers: {
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

export function updateSupply(applicantID, data) {
  const requestObject = {
    method: 'PUT',
    headers: {
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

export function updateDemand(applicantID, data) {
  const requestObject = {
    method: 'PUT',
    headers: {
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

export function getSkills() {
  const requestObject = { method: 'GET' }
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

export function getClients() {
  const requestObject = { method: 'GET' }
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

export function getDemandSkill(skillID) {
  const requestObject = { method: 'GET', headers: { 'Content-Type': 'application/json' } }
  return fetch(`${URL}/api/demand/skillID/${skillID}`, requestObject)
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

export function deleteDemand(demandId) {
  const requestObject = { method: 'DELETE' }
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

export function getSupplySkill(skillID) {
  const requestObject = { method: 'GET' }
  return fetch(`${URL}/api/supply/skillID/${skillID}`, requestObject)
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

export function deleteSupply(supplyId) {
  const requestObject = { method: 'DELETE' }
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

export function postClient(data) {
  const requestObject = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  return fetch(`${URL}/api/clients`, requestObject)
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
}

export function putClient(clientID, data) {
  const requestObject = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  return fetch(`${URL}/api/clients/${clientID}`, requestObject)
    .then((res) => {
      if (!res.ok) {
        throw res
      }
      return res.json()
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
export function getAllDemand() {
  const requestObject = { method: 'GET' }
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
      return error.status
    })
}
export function getAllSupply() {
  const requestObject = { method: 'GET' }
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
      return error.status
    })
}

const login = (credentialsObj) => {
  return fetch('http://localhost:8000/token-auth/', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(credentialsObj)
  })
}

const getCurrentUser = (token) => {
  return fetch('http://localhost:8000/accounts/current-user/', {
    headers: {
      'Authorization': `JWT ${token}`
    }
  })
    .then(response => response.json())
}

const signup = (credentialsObj) => {
  return fetch('http://localhost:8000/accounts/users', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(credentialsObj)
  })
}

export default {
  login: login,
  getCurrentUser: getCurrentUser,
  signup: signup,
}

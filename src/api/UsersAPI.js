const login = (credentialsObj) => {
  return fetch('https://game-recommender-backend.herokuapp.com/token-auth/', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(credentialsObj)
  })
}

const getCurrentUser = (token) => {
  return fetch('https://game-recommender-backend.herokuapp.com/accounts/current-user/', {
    headers: {
      'Authorization': `JWT ${token}`
    }
  })
    .then(response => response.json())
}

const signup = (credentialsObj) => {
  return fetch('https://game-recommender-backend.herokuapp.com/accounts/users', {
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

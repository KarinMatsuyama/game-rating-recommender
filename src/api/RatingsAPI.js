const url = "http://localhost:8000/video-games"

const fetchGameByIgdbId = (igdbId, token) => {
  return fetch(`${url}/games?igdbid=${igdbId}`, {
    headers: {
      'Authorization': `JWT ${token}`
    }
  })
}

const fetchGameById = (id, token) => {
  return fetch(`${url}/games/${id}/`, {
    headers: {
      'Authorization': `JWT ${token}`
    }
  })
  .then(reponse => reponse.json())
}

const createGame = (newGameObj, token) => {
  return fetch(`${url}/games/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    },
    method: "POST",
    body: JSON.stringify(newGameObj)
  })
}

const createRating = (newRatingObj, token) => {
  return fetch(`${url}/ratings/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    },
    method: "POST",
    body: JSON.stringify(newRatingObj)
  })
}

const updateRating = (id, updatedRatingObj, token) => {
  return fetch(`${url}/ratings/${id}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    },
    method: "PATCH",
    body: JSON.stringify(updatedRatingObj)
  })
}

const deleteRating = (id, token) => {
  return fetch(`${url}/ratings/${id}/`, {
    headers: {
      'Authorization': `JWT ${token}`
    },
    method: "DELETE"
  })
}

const fetchRatingsById = (id, token) => {
  return fetch(`${url}/ratings/${id}/`, {
    headers: {
      'Authorization': `JWT ${token}`
    }
  })
}

const fetchRatingsByGameId = (gameId, token) => {
  return fetch(`${url}/ratings?game=${gameId}`, {
    headers: {
      'Authorization': `JWT ${token}`
    }
  })
}

const fetchRatingsForCurrentUser = (userId, token) => {
  return fetch(`${url}/ratings?author=${userId}`, {
    headers: {
      'Authorization': `JWT ${token}`
    }
  })
}

export default {
  fetchGameByIgdbId: fetchGameByIgdbId,
  fetchGameById: fetchGameById,
  createGame: createGame,
  createRating: createRating,
  fetchRatingsByGameId: fetchRatingsByGameId,
  fetchRatingsForCurrentUser: fetchRatingsForCurrentUser,
  updateRating: updateRating,
  deleteRating: deleteRating,
  fetchRatingsById: fetchRatingsById,
}

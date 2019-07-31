const url = "https://game-recommender-backend.herokuapp.com/video-games"

const fetchGameByIgdbId = (igdbId) => {
  return fetch(`${url}/games?igdbid=${igdbId}`)
}

const fetchGameById = (id) => {
  return fetch(`${url}/games/${id}/`)
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

const fetchRatingsByGameId = (gameId) => {
  return fetch(`${url}/ratings?game=${gameId}`)
}

const fetchRatingsForCurrentUser = (userId, token) => {
  return fetch(`${url}/ratings?author=${userId}`, {
    headers: {
      'Authorization': `JWT ${token}`
    }
  })
}

const fetchAverageRating = (gameId) => {
  return fetch(`${url}/games/${gameId}/average-rating`)
}

const fetchRecommendations = (token) => {
  return fetch(`${url}/clusters/recommendations/`, {
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
  fetchAverageRating: fetchAverageRating,
  fetchRecommendations: fetchRecommendations,
}

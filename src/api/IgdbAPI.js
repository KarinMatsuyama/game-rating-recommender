const url = 'https://api-v3.igdb.com'
const API_KEY = process.env.REACT_APP_API_KEY

const twitchOauth = () => {
  return fetch('https://game-recommender-backend.herokuapp.com/video-games/twitch-oauth/', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
  })
    .then(response => response.json())
}

const searchGames = (text) => {
  return twitchOauth()
    .then((res) => {
      let parsed = JSON.parse(res)
      return fetch(`/games?search=${text}&fields=name,genres,cover,platforms,first_release_date,summary,aggregated_rating,similar_games&filter[first_release_date][gt]=1356998400`, {
        headers: {
          'Client-ID': API_KEY,
          'Authorization': `Bearer ${parsed.access_token}`
        },
      })
        .then(response => response.json())
    })
}

const fetchPopularGames = () => {
  return twitchOauth()
    .then((res) => {
      let parsed = JSON.parse(res)
      return fetch(`/games/?fields=name,genres,cover,platforms,first_release_date,summary,aggregated_rating,similar_games&order=popularity:desc&filter[aggregated_rating][gt]=75&filter[cover][gt]=1`, {
        headers: {
          'Client-ID': API_KEY,
          'Authorization': `Bearer ${parsed.access_token}`
        },
      })
        .then(response => response.json())
    })
}

const fetchComingSoon = () => {
  let today = parseInt(Date.now()/1000)
  return twitchOauth()
    .then((res) => {
      let parsed = JSON.parse(res)
      return fetch(`/games/?fields=name,genres,cover,platforms,first_release_date,summary,aggregated_rating,similar_games&order=date:asc&filter[first_release_date][gt]=${today}&filter[cover][gt]=1`, {
        headers: {
          'Client-ID': API_KEY,
          'Authorization': `Bearer ${parsed.access_token}`
        },
      })
        .then(response => response.json())
    })
}

const fetchGamesById = (idArr) => {
  return twitchOauth()
    .then((res) => {
      let parsed = JSON.parse(res)
      return fetch(`/games/${idArr.join(',')}?fields=name,genres,cover,platforms,first_release_date,summary,aggregated_rating,similar_games`, {
        headers: {
          'Client-ID': API_KEY,
          'Authorization': `Bearer ${parsed.access_token}`
        },
      })
        .then(response => response.json())
    })
}

const fetchCover = (coverIdsArr) => {
  return twitchOauth()
    .then((res) => {
      let parsed = JSON.parse(res)
      return fetch(`/covers/${coverIdsArr.join(',')}?fields=game,url`, {
        headers: {
          'Client-ID': API_KEY,
          'Authorization': `Bearer ${parsed.access_token}`
        },
      })
        .then(response => response.json())
    })
}

const fetchGenres = (genreIdsArr) => {
  return twitchOauth()
    .then((res) => {
      let parsed = JSON.parse(res)
      return fetch(`/genres/${genreIdsArr.join(',')}?fields=name`, {
        headers: {
          'Client-ID': API_KEY,
          'Authorization': `Bearer ${parsed.access_token}`
        },
      })
        .then(response => response.json())
    })
}

const fetchPlatforms = (platformIdsArr) => {
  return twitchOauth()
    .then((res) => {
      let parsed = JSON.parse(res)
      fetch(`/platforms/${platformIdsArr.join(',')}?fields=abbreviation,name`, {
        headers: {
          'Client-ID': API_KEY,
          'Authorization': `Bearer ${parsed.access_token}`
        },
      })
        .then(response => response.json())
    })
}

export default {
  searchGames: searchGames,
  fetchPopularGames: fetchPopularGames,
  fetchComingSoon: fetchComingSoon,
  fetchCover: fetchCover,
  fetchGenres: fetchGenres,
  fetchPlatforms: fetchPlatforms,
  fetchGamesById: fetchGamesById,
}

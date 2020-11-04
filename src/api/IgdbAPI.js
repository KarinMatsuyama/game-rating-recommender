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

const getTwitchToken = async() => {
  const res = await twitchOauth()
  const token = JSON.parse(res).access_token
  localStorage.setItem('twitchToken', token)
  return token
}

const searchGames = async (text) => {
  let token = localStorage.getItem('twitchToken');
  if (!token) {
    token = await getTwitchToken();
  }
  return fetch(`/games?search=${text}&fields=name,genres,cover,platforms,first_release_date,summary,aggregated_rating,similar_games&filter[first_release_date][gt]=1356998400`, {
    headers: {
      'Client-ID': API_KEY,
      'Authorization': `Bearer ${token}`
    },
  })
    .then(response => response.json())
}

const fetchPopularGames = async () => {
  let token = localStorage.getItem('twitchToken');
  if (!token) {
    token = await getTwitchToken();
  }
  return fetch(`/games/?fields=name,genres,cover,platforms,first_release_date,summary,aggregated_rating,similar_games&order=popularity:desc&filter[aggregated_rating][gt]=75&filter[cover][gt]=1`, {
    headers: {
      'Client-ID': API_KEY,
      'Authorization': `Bearer ${token}`
    },
  })
    .then(response => response.json())
}

const fetchComingSoon = async () => {
  let today = parseInt(Date.now()/1000)
  let token = localStorage.getItem('twitchToken');
  if (!token) {
    token = await getTwitchToken();
  }
  return fetch(`/games/?fields=name,genres,cover,platforms,first_release_date,summary,aggregated_rating,similar_games&order=date:asc&filter[first_release_date][gt]=${today}&filter[cover][gt]=1`, {
    headers: {
      'Client-ID': API_KEY,
      'Authorization': `Bearer ${token}`
    },
  })
    .then(response => response.json())
}

const fetchGamesById = async (idArr) => {
  let token = localStorage.getItem('twitchToken');
  if (!token) {
    token = await getTwitchToken();
  }
  return fetch(`/games/${idArr.join(',')}?fields=name,genres,cover,platforms,first_release_date,summary,aggregated_rating,similar_games`, {
    headers: {
      'Client-ID': API_KEY,
      'Authorization': `Bearer ${token}`
    },
  })
    .then(response => response.json())
}

const fetchCover = async (coverIdsArr) => {
  let token = localStorage.getItem('twitchToken');
  if (!token) {
    token = await getTwitchToken();
  }
  return fetch(`/covers/${coverIdsArr.join(',')}?fields=game,url`, {
    headers: {
      'Client-ID': API_KEY,
      'Authorization': `Bearer ${token}`
    },
  })
    .then(response => response.json())
}

const fetchGenres = async (genreIdsArr) => {
  let token = localStorage.getItem('twitchToken');
  if (!token) {
    token = await getTwitchToken();
  }
  return fetch(`/genres/${genreIdsArr.join(',')}?fields=name`, {
    headers: {
      'Client-ID': API_KEY,
      'Authorization': `Bearer ${token}`
    },
  })
    .then(response => response.json())
}

const fetchPlatforms = async (platformIdsArr) => {
  let token = localStorage.getItem('twitchToken');
  if (!token) {
    token = await getTwitchToken();
  }
  return fetch(`/platforms/${platformIdsArr.join(',')}?fields=abbreviation,name`, {
    headers: {
      'Client-ID': API_KEY,
      'Authorization': `Bearer ${token}`
    },
  })
    .then(response => response.json())
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

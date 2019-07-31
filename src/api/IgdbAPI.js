const url = 'https://api-v3.igdb.com'
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const API_KEY = process.env.REACT_APP_API_KEY

const searchGames = (text) => {
  return fetch(`${proxyUrl}${url}/games?search=${text}&fields=name,genres,cover,platforms,first_release_date,summary,aggregated_rating,similar_games&filter[first_release_date][gt]=1356998400`, {
    headers: {
      'user-key': API_KEY,
    },
  })
    .then(response => response.json())
}

const fetchPopularGames = () => {
  return fetch(`${proxyUrl}${url}/games/?fields=name,genres,cover,platforms,first_release_date,summary,aggregated_rating,similar_games&order=popularity:desc&filter[aggregated_rating][gt]=75&filter[cover][gt]=1`, {
    headers: {
      'user-key': API_KEY
    },
  })
    .then(response => response.json())
}

const fetchComingSoon = () => {
  let today = parseInt(Date.now()/1000)
  return fetch(`${proxyUrl}${url}/games/?fields=name,genres,cover,platforms,first_release_date,summary,aggregated_rating,similar_games&order=date:asc&filter[first_release_date][gt]=${today}&filter[cover][gt]=1`, {
    headers: {
      'user-key': API_KEY
    },
  })
    .then(response => response.json())
}

const fetchGamesById = (idArr) => {
  return fetch(`${proxyUrl}${url}/games/${idArr.join(',')}?fields=name,genres,cover,platforms,first_release_date,summary,aggregated_rating,similar_games`, {
    headers: {
      'user-key': API_KEY
    },
  })
    .then(response => response.json())
}

const fetchCover = (coverId) => {
  return fetch(`${proxyUrl}${url}/covers/${coverId}?fields=url`, {
    headers: {
      'user-key': API_KEY
    },
  })
    .then(response => response.json())
}

const fetchGenres = (genreIdsArr) => {
  return fetch(`${proxyUrl}${url}/genres/${genreIdsArr.join(',')}?fields=name`, {
    headers: {
      'user-key': API_KEY
    },
  })
    .then(response => response.json())
}

const fetchPlatforms = (platformIdsArr) => {
  return fetch(`${proxyUrl}${url}/platforms/${platformIdsArr.join(',')}?fields=abbreviation,name`, {
    headers: {
      'user-key': API_KEY
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

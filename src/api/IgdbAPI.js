const url = 'https://api-v3.igdb.com'
const API_KEY = process.env.REACT_APP_API_KEY

const searchGames = (text) => {
  return fetch(`/games?search=${text}&fields=name,genres,cover,platforms,first_release_date,summary,aggregated_rating,similar_games&filter[first_release_date][gt]=1356998400`, {
    headers: {
      'user-key': API_KEY,
    },
  })
    .then(response => response.json())
}

const fetchPopularGames = () => {
  return fetch('/games/?fields=name,genres,cover,platforms,first_release_date,summary,aggregated_rating,similar_games&order=popularity:desc&filter[aggregated_rating][gt]=75&filter[cover][gt]=1', {
    headers: {
      'user-key': API_KEY
    },
  })
    .then(response => response.json())
}

const fetchGamesById = (idArr) => {
  return fetch(`/games/${idArr.join(',')}?fields=name,genres,cover,platforms,first_release_date,summary,aggregated_rating,similar_games`, {
    headers: {
      'user-key': API_KEY
    },
  })
    .then(response => response.json())
}

const fetchCover = (coverId) => {
  return fetch(`/covers/${coverId}?fields=url`, {
    headers: {
      'user-key': API_KEY
    },
  })
    .then(response => response.json())
}

const fetchGenres = (genreIdsArr) => {
  return fetch(`/genres/${genreIdsArr.join(',')}?fields=name`, {
    headers: {
      'user-key': API_KEY
    },
  })
    .then(response => response.json())
}

const fetchPlatforms = (platformIdsArr) => {
  return fetch(`/platforms/${platformIdsArr.join(',')}?fields=abbreviation,name`, {
    headers: {
      'user-key': API_KEY
    },
  })
    .then(response => response.json())
}

export default {
  searchGames: searchGames,
  fetchPopularGames: fetchPopularGames,
  fetchCover: fetchCover,
  fetchGenres: fetchGenres,
  fetchPlatforms: fetchPlatforms,
  fetchGamesById: fetchGamesById,
}
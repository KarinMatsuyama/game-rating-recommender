const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
const url = "https://www.googleapis.com/youtube/v3"

const fetchVideoByKeyword = (keyword) => {
  return fetch(`${url}/search?key=${API_KEY}&q=${keyword}&part=snippet&maxResults=2`)
  .then(response => response.json())
}

export default {
  fetchVideoByKeyword: fetchVideoByKeyword
}

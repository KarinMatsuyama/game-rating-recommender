const express = require('express')
const proxy = require('http-proxy-middleware')

const app = express()
app.use('/games', proxy({ target: 'https://api-v3.igdb.com', changeOrigin: true }))
app.listen('video-game-recommender.herokuapp.com')

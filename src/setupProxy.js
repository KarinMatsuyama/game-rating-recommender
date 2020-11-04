const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(proxy('/games', { target: 'https://api.igdb.com/v4', changeOrigin: true }))
    app.use(proxy('/covers', { target: 'https://api.igdb.com/v4', changeOrigin: true }))
    app.use(proxy('/genres', { target: 'https://api.igdb.com/v4', changeOrigin: true }))
    app.use(proxy('/platforms', { target: 'https://api.igdb.com/v4', changeOrigin: true }))
}

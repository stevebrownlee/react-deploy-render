const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('/var/data/db.json')

//const middlewares = jsonServer.defaults({ noCors: true })
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 8085

server.use(middlewares)
server.use(router)

server.listen(port, () => {
    console.log('JSON Server is running')
})
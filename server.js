const initialDbPath = './api/db.json';
const dbPath = '/var/data/db.json';

const fs = require('fs');
if (!fs.existsSync(dbPath)) {
    fs.copyFileSync(initialDbPath, dbPath);
}

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(dbPath)
const middlewares = jsonServer.defaults({
    static: "./build"
});

const port = process.env.PORT || 8085

server.use(jsonServer.rewriter({
    "/api/animalia": "/api/animals?_expand=employee&_sort=employee.id&_embed=treatments&_expand=location",
    "/api/animalia/:id": "/api/animals/:id?_expand=employee&_sort=employee.id&_embed=treatments&_expand=location"
}))

server.use(middlewares)
server.use('/api', router)

server.listen(port, () => {
    console.log('JSON Server is running')
})
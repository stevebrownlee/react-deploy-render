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

server.use(middlewares)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    "/api/animalia": "/api/animals?_expand=employee&_sort=employee.id&_embed=treatments&_expand=location",
    "/api/animalia/:id": "/api/animals/:id?_expand=employee&_sort=employee.id&_embed=treatments&_expand=location"
}))

server.use((req, res, next) => {
    // use originalUrl since other middleware is likely reassigning req.url
    const isApiRoute = req.originalUrl.includes('/api/');

    if (isApiRoute) return next();

    return res.sendFile(path.join(__dirname, './build/index.html'));
});

server.use(router)

server.listen(port, () => {
    console.log('JSON Server is running')
})
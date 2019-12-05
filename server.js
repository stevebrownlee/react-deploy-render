const path = require('path');
const dbPath = '/var/data/db.json';
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults({ static: "./build" });
const port = process.env.PORT || 5002;

server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    "/api/animalia": "/animals?_expand=employee&_sort=employee.id&_embed=treatments&_expand=location",
    "/api/animalia/:id": "/animals/:id?_expand=employee&_sort=employee.id&_embed=treatments&_expand=location"

}))

server.use(middlewares);

server.use((req, res, next) => {
    // use originalUrl since other middleware is likely reassigning req.url
    const isApiRoute = req.originalUrl.includes('/api/');
    console.log(`isApiRoute: ${isApiRoute}`)

    if (isApiRoute) return next();

    console.log("Not API route, serve static file")
    return res.sendFile(path.join(__dirname, './build/index.html'));
});

server.use(router);

server.listen(port, () => {
    console.log(`app running on port ${port}`);
});
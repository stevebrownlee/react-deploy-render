const path = require('path');
const dbPath = '/var/data/db.json';
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults({ static: "./build" });
const port = process.env.PORT || 5002;

server.use(jsonServer.rewriter({
    "/api/animalia": "/animals?_expand=employee&_sort=employee.id&_embed=treatments&_expand=location",
    "/api/animalia/:id": "/animals/:id?_expand=employee&_sort=employee.id&_embed=treatments&_expand=location",
    "/api/users*": "/600/users$1",
    "/api/animalOwners*": "/660/animalOwners$1",
    "/api/treatments*": "/660/treatments$1",
    "/api/animals*": "/660/animals$1",
    "/api/owners*": "/660/owners$1",
    "/api/locations*": "/660/locations$1",
    "/api/employees*": "/660/employees$1"

}))

server.use(middlewares);

server.use((req, res, next) => {
    // use originalUrl since other middleware is likely reassigning req.url
    const isApiRoute = req.originalUrl.includes('/api/');

    if (isApiRoute) return next();

    return res.sendFile(path.join(__dirname, './build/index.html'));
});

server.use(router);

server.listen(port, () => {
    console.log(`app running on port ${port}`);
});
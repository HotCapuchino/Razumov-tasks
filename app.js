const jsonServer = require('json-server');
// const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');
const express = require('express');
// const fs = require('fs');
// const https = require('https');

const PORT = 8000;
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

const app = express();

// const serverOptions = {
//     key: fs.readFileSync('./.ssl/localhost.key'),
//     cert: fs.readFileSync('./.ssl/localhost.crt'),
// }

app.use(cors(corsOptions));
app.use(middlewares);
app.use(jsonServer.bodyParser);
app.use('/', router);

// server.use(middlewares);
// server.use(cors(corsOptions));
// server.use(router);
// server.use(jsonServer.bodyParser); 

app.listen(PORT, function() {
    console.log(`Server is running on ${PORT}`);
})

// https.createServer(serverOptions, server).listen(PORT, function() {
//     console.log(`json-server started on port ${PORT}`);
// });
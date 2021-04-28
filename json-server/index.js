const jsonServer = require('json-server');
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');
const express = require('express');

const PORT = 8000;
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(middlewares);
app.use(jsonServer.bodyParser);
app.use('/', router);

app.listen(PORT, function() {
    console.log(`Server is running on ${PORT}`);
})
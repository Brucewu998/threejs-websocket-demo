const express = require('express');
const expressWs = require('express-ws');
const router = require('./router');

const app = express();
expressWs(app);

let port = 30038;

app.use('/', router);

app.listen(port, () => {
    console.log(`port: ${port}`);
});





//imports
const http = require('http');
const app = require('./app');

//variables
const port = process.env.PORT || 3000;

app.set('port',);
const server = http.createServer(app);

server.listen(port);
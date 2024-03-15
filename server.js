require('dotenv').config();
// INISIALISASI PORT DARI ENV
const port = process.env.PORT;

const app = require('./app');
const http = require('http');
const server = http.createServer(app);


server.listen();
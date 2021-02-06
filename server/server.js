const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const hbs = require('hbs');

const app = express();
let server = http.createServer(app);
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

//Express HBS engine

hbs.registerPartials(path.join(__dirname, '../views/partials'));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');


app.use(require('../routes/index'));
app.use(express.static(publicPath));


// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});
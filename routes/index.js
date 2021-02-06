const express = require('express');
const app = express.Router();
//const hbs = require('hbs');

//hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
    res.render('../views/index')
});
app.get('/contact', (req, res) => {
    res.render('../views/contact')
});
app.get('/index', (req, res) => {
    res.render('../public/index')
});

module.exports = app;
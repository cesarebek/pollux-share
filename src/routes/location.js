const express = require('express');
const route = new express.Router();

//Read locations
route.get('/', (req, res) => {
  res.send('Welcome!');
});

module.exports = route;

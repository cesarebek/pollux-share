const express = require('express');
const Location = require('../models/location');
const upload = require('../utils/multer');
const route = new express.Router();

//Create location
route.post('/', upload.single('image'), async (req, res) => {
  //Url constructor for images link
  const protocol = req.protocol;
  const host = req.get('host');
  const url = `${protocol}://${host}/`;
  const location = new Location({
    ...req.body,
    image: `${url}${req.file.path}`,
  });
  try {
    const saveLocation = await location.save();
    res.status(201).json(saveLocation);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Read locations
route.get('/', async (req, res) => {
  try {
    const locations = await Location.find({});
    res.json(locations);
  } catch (e) {
    res.status(500).json({ message: 'Unable to send back locations' });
  }
});

//Read location
route.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const location = await Location.findById(id);
    res.json(location);
  } catch (e) {
    res.status(404).send(e);
  }
});
module.exports = route;

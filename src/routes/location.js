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
    res.status(201).json({
      message: 'Location created successfully!',
      result: saveLocation,
    });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//Read locations
//GET /tasks?limit=10&skip=10
route.get('/', async (req, res) => {
  try {
    const locations = await Location.find({});

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < locations.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.locations = locations.slice(startIndex, endIndex);

    res.json({ pollutedLocations: results });
  } catch (e) {
    res.status(500).json({ message: 'Unable to send back locations' });
  }
});

//Read location
route.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const location = await Location.findById(id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found.' });
    }
    res.json({ pollutedLocation: location });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

//Update location info
route.patch('/update-info/:id', upload.none(), async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!location) {
      return res.status(404).json({ message: 'Location not found.' });
    }
    res.json(location);
    // res.json({
    //   message: 'Location info updated successfully!',
    //   result: location,
    // });
  } catch (e) {
    res.status(400).json({ message: e });
  }
});

//Update location image
route.patch('/update-image/:id', upload.single('image'), async (req, res) => {
  //Url constructor for images link
  const protocol = req.protocol;
  const host = req.get('host');
  const url = `${protocol}://${host}/`;
  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      { image: `${url}${req.file.path}` },
      { new: true }
    );
    if (!location) {
      res.status(404).json({ message: 'Location not found.' });
    }
    res.json({
      message: 'Location image updated successfully!',
      result: location,
    });
  } catch (e) {
    res.status(400).json({ message: e });
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found.' });
    }
    res.json({
      message: 'Location image deleted successfully!',
      result: location,
    });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});
module.exports = route;

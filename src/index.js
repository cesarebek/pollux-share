const express = require('express');
require('./db/mongoose');
const locationRoute = require('./routes/location');
const app = express();
const port = process.env.PORT || 8080;

app.enable('trust proxy');
app.use(express.json());
app.use('/src/uploads', express.static('src/uploads'));
app.use('/location', locationRoute);

app.listen(port, () => {
  console.log(`Server is Up adn Runnig at port: ${port}`);
});

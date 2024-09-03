// index.js
const express = require('express');
const dotenv = require('dotenv');
const weatherRoutes = require('./routes/weather');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/weather', weatherRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




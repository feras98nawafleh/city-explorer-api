// 'use strict';
// const express = require('express');
// const server = express();
// const cors = require('cors');
// server.use(cors());
// require('dotenv').config();
// const weather = require('./data/weather.json');
// server.get('/weather', (req, res) => {

//   //req.query.' ' is wht you want the variable name in the URL
//   let latitude = Number(req.query.latitude);
//   let longitude = Number(req.query.longitude);
//   let searchQuery = req.query.searchQuery;
//   //your API gets these data the moment a user connects to it
//   //and then the work and below logic begins
//   if (latitude && longitude || searchQuery) {
//     let results = weather.find(item => item.display_name === searchQuery);
//     if (results) {
//       let foreCast = results.data.map(item => {
//         return {
//           date: item.datetime,
//           description: item.weather.description,
//         };
//       });
//       res.status(200).json(foreCast);
//     } else {
//       res.status(404).send('City Not Found');
//     }
//   } else {
//     res.status(400).send('please send right query params');
//   }
// });

// server.get('/weather', (req, res) => {
//   // converting to get data from outsource API
// });

// server.listen(PORT, () => {
//   console.log(`Listening on PORT ${PORT}`);
// });

/* ################################################################################the above code is usde only when the API is located locally as a json file
##############################################################################*/

'use strict';

const express = require('express');
const server = express();
const cors = require('cors');
server.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;

const handleWeatherAPI = require('./controllers/Weather.Controller');
const handleMoviesAPI = require('./controllers/Movies.Controller');

server.get('/weather', handleWeatherAPI);
server.get('/movies', handleMoviesAPI);

server.listen(PORT, () => {
  console.log(`on PORT ${PORT}: Listening...`);
});






















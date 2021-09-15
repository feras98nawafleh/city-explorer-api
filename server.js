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
const axios = require('axios');
server.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;

class WeatherModel {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

let handleWeatherAPI = async (req, res) => {
  let latitude = req.query.latitude;
  let longitude = req.query.longitude;
  let url = `HTTPS: https://api.weatherbit.io/v2.0/forecast/daily?latitude=${latitude}&longitude=${longitude}&key=${process.env.WEATHER_API_KEY}`;
  let response = await axios.get(url);
  let respondeData = response.data.map(item => {
    return new WeatherModel(item.datetime, item.weather.description);
  });
  res.status(200).json(respondeData);
};

server.get('/weather', handleWeatherAPI);

class MoviesModel {
  constructor(title, overview, average_votes, total_votes, image_url, popularity, released_on) {
    this.title = title;
    this.overview = overview;
    this.average_votes = average_votes;
    this.total_votes = total_votes;
    this.image_url = image_url;
    this.popularity = popularity;
    this.released_on = released_on;
  }
}

let handleMoviesAPI = async (req, res) => {
  let place = req.query.place;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query='${place}''`;
  let response = await axios.get(url);
  let responseData = response.map(item => {
    return new MoviesModel(item.title, item.overview, item.vote_average, item.vote_count, item.backdrop_path, item.popularity, item.release_date);
  });
  res.status(200).json(responseData);
};

server.get('/movies', handleMoviesAPI);

server.listen(PORT, () => {
  console.log(`on PORT ${PORT}: Listening...`);
});






















'use strice';
const axios = require('axios');
const WeatherModel = require('../models/Weather.Model');

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

module.exports = handleWeatherAPI;

'use strice';
const axios = require('axios');
const WeatherModel = require('../models/Weather.Model');
const WeatherCache = require('../helpers/Weather.Cache');


const dateNow = Date.now();
const weatherCache = new WeatherCache();

let handleWeatherAPI = async (req, res) => {
  let latitude = req.query.latitude;
  let longitude = req.query.longitude;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lat=${latitude}&lon=${longitude}`;
  if (weatherCache.data.length > 0 && weatherCache.date.getHours() === dateNow.getHours()) {
    res.json({ 'data': weatherCache.data, 'message': 'data came from cache' });
  } else {
    let response = await axios.get(url);
    let respondeData = response.data.map(item => {
      return new WeatherModel(item.datetime, item.weather.description);
    });
    res.status(200).json(respondeData);
    weatherCache.date = dateNow;
    weatherCache.data = respondeData;
  }
};

module.exports = handleWeatherAPI;

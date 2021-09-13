'use strict';
const express = require('express');
const server = express();
const cors = require('cors');
server.use(cors());
require('dotenv').config();
const weather = require('./data/weather.json');
const PORT = process.env.PORT;

server.get('/weather', (req, res) => {
  let Amman = weather[2];
  let city_name = Amman.city_name;
  let lat = Number(Amman.lat);
  let lon = Number(Amman.lon);
  let latQuery = req.query.lat;
  let lonQuery = req.query.lon;
  res.send('hello!');
  let city = weather.find(item =>{
    return latQuery === item.lat && lonQuery === item.lon;
  });
  console.log();

  let foreCast= city.data.map(info=>{
    return{
      date:info.valid_date ,
      description:info.weather.description
    };
  });
  res.status(200).send(foreCast);
});

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

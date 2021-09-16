'use strict';
const axios = require('axios');
const MoviesModel = require('../models/Movies.Model');

let handleMoviesAPI = async (req, res) => {
  let place = req.query.place;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${place}`;
  let response = await axios.get(url);
  let responseData = response.map(item => {
    return new MoviesModel(item.title, item.overview, item.vote_average, item.vote_count, item.backdrop_path, item.popularity, item.release_date);
  });
  res.status(200).json(responseData);
};

module.exports = handleMoviesAPI;

'use strict';
const axios = require('axios');
const MoviesModel = require('../models/Movies.Model');
const MoviesCache = require('../helpers/Movies.Cache');

const dateNow = Date.now();
const moviesCache = new MoviesCache();

let handleMoviesAPI = async (req, res) => {
  let place = req.query.place;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${place}`;
  if (moviesCache.data.length > 0 && moviesCache.date.getHours() === dateNow.getHours()) {
    res.json({ 'data': moviesCache.data, 'message': 'data came from cache' });
  } else {
    let response = await axios.get(url);
    let responseData = response.map(item => {
      return new MoviesModel(item.title, item.overview, item.vote_average, item.vote_count, item.backdrop_path, item.popularity, item.release_date);
    });
    res.status(200).json(responseData);
    moviesCache.date = dateNow;
    moviesCache.data = responseData;
  }
};

module.exports = handleMoviesAPI;

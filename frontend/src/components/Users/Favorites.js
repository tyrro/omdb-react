import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MovieCard from '../Movies/Card';

const DEFAULT_QUERY_TITLE = 'satyajit';
const API_KEY = 'ce762116';

const FavoriteList = () => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    fetchMovies({ title: DEFAULT_QUERY_TITLE, year: '' });
    return () => abortController.abort();
  }, []);

  const fetchMovies = async ({ title, year }) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await axios.get(
        `http://www.omdbapi.com/?s=${title}&y=${year}&apikey=${API_KEY}`,
      );
      if (result.data.Response === 'False') {
        setErrorMessage(result.data.Error);
      } else {
        setMovieList(result.data.Search);
      }
    } catch (error) {
      setErrorMessage('Network Error!');
    }
    setIsLoading(false);
  };

  return (
    <div className="movie-list">
      {isLoading && <div className="lds-dual-ring" />}

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="movie-list__cards">
        {!isLoading &&
          movieList.length > 0 &&
          movieList.map(movie => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              year={movie.Year}
              imdbId={movie.imdbID}
            />
          ))}
      </div>
    </div>
  );
};

export default FavoriteList;

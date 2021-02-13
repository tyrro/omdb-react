import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { debounce } from 'throttle-debounce';

import MovieCard from './Card';

const DEFAULT_QUERY_TITLE = 'satyajit';
const API_KEY = 'ce762116';

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [queryTitle, setQueryTitle] = useState(DEFAULT_QUERY_TITLE);
  const [queryYear, setQueryYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage(null);
    const abortController = new AbortController();

    fetchMovies({ title: DEFAULT_QUERY_TITLE, year: '' });
    setIsLoading(false);

    return () => abortController.abort();
  }, []);

  const fetchMovies = async ({ title, year }) => {
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
      setErrorMessage(error);
    }
  };

  const fetchMoviesByTitleWithDebounce = useRef(
    debounce(1000, ({ title, year }) => {
      fetchMovies({ title, year });
    }),
  ).current;

  const handleTitleChange = event => {
    setQueryTitle(event.target.value);
    fetchMoviesByTitleWithDebounce({ title: event.target.value, year: queryYear });
  };

  const fetchMoviesByYearWithDebounce = useRef(
    debounce(1000, ({ title, year }) => {
      fetchMovies({ title, year });
    }),
  ).current;

  const handleYearChange = event => {
    setQueryYear(event.target.value);
    fetchMoviesByYearWithDebounce({ title: queryTitle, year: event.target.value });
  };

  return (
    <div className="movie-list">
      <div className="movie-list__search input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Title"
          aria-label="Search by Title"
          onChange={event => handleTitleChange(event)}
        />

        <input
          type="text"
          className="form-control"
          placeholder="Search by Year"
          aria-label="Search by Year"
          onChange={event => handleYearChange(event)}
        />
      </div>

      {isLoading && <div className="lds-dual-ring" />}

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="movie-list__cards row mx-0">
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

export default MovieList;

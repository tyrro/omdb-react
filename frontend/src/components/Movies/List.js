import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'throttle-debounce';

import MovieCard from './Card';

import httpClient from '../../shared/httpClient';
import routes from '../../routes/index';

const DEFAULT_QUERY_TITLE = 'satyajit';

const MovieList = ({ user }) => {
  const [movieList, setMovieList] = useState([]);
  const [queryTitle, setQueryTitle] = useState(DEFAULT_QUERY_TITLE);
  const [queryYear, setQueryYear] = useState('');
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
      const response = await httpClient.get(routes.movies.index({ s: title, y: year }), {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (response.data.response === 'False') {
        setErrorMessage(response.data.error);
      } else {
        setMovieList(response.data.search);
      }
    } catch (error) {
      setErrorMessage(error);
    }
    setIsLoading(false);
  };

  const fetchMoviesByTitleWithDebounce = useRef(
    debounce(1000, ({ title, year }) => {
      fetchMovies({ title, year });
    }),
  ).current;

  const handleTitleChange = event => {
    let title = event.target.value;
    if (title === '') {
      title = DEFAULT_QUERY_TITLE; // OMDB API requires the title to be non empty
    }
    setQueryTitle(title);
    fetchMoviesByTitleWithDebounce({ title, year: queryYear });
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
      <div className="movie-list__search input-group mt-4">
        <input
          type="text"
          className="form-control mr-2"
          placeholder="Search by Title"
          aria-label="Search by Title"
          onChange={event => handleTitleChange(event)}
        />

        <input
          type="text"
          className="form-control ml-2"
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

      <div className="movie-list__cards">
        {!isLoading &&
          movieList.length > 0 &&
          movieList.map(movie => (
            <MovieCard
              key={movie.imdbId}
              title={movie.title}
              poster={movie.poster}
              year={movie.year}
              favorite={movie.favorite}
              imdbId={movie.imdbId}
            />
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(MovieList);

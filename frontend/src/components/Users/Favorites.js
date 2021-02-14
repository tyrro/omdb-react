import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import MovieCard from '../Movies/Card';

import httpClient from '../../shared/httpClient';
import routes from '../../routes/index';

const FavoriteList = ({ user }) => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    fetchMovies();
    return () => abortController.abort();
  }, []);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await httpClient.get(routes.users.favoriteMovies.index(), {
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

  return (
    <div className="movie-list">
      {isLoading && <div className="lds-dual-ring" />}

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      {!isLoading && movieList.length === 0 && (
        <p>You haven't added anything to your favorite list yet</p>
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

export default connect(mapStateToProps)(FavoriteList);

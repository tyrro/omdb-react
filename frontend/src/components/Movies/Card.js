import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import httpClient from '../../shared/httpClient';
import routes from '../../routes/index';

const MovieCard = ({
  title,
  poster,
  year,
  favorite,
  imdbId,
  fetchMoviesWithCurrentState,
  user,
}) => {
  const addToFavorite = async () => {
    try {
      await httpClient.post(
        routes.users.favoriteMovies.create(),
        { item_id: imdbId },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        },
      );
      fetchMoviesWithCurrentState();
    } catch (error) {}
  };
  return (
    <div className="card">
      <Link to={`movies/${imdbId}`}>
        <img
          className="card-img-top"
          style={{ objectFit: 'cover' }}
          src={poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : poster}
          alt=""
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            <small className="text-muted">{year}</small>
          </p>
        </div>
      </Link>

      {favorite && (
        <button
          type="button"
          className="btn btn-light btn-sm flex-grow-1"
          style={{ cursor: 'default' }}
        >
          Your Favorite
        </button>
      )}

      {!favorite && (
        <button
          type="button"
          className="btn btn-light btn-sm flex-grow-1"
          onClick={() => addToFavorite()}
        >
          Add to Favorite
        </button>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(MovieCard);

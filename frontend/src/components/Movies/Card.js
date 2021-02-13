import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ title, poster, year, imdbId }) => {
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
      <button type="button" className="btn btn-light btn-sm flex-grow-1">
        Add to Favorite
      </button>
    </div>
  );
};

export default MovieCard;

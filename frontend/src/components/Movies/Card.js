import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ title, poster, year, imdbId }) => {
  return (
    <div className="card col-sm-3">
      <Link to={`movies/${imdbId}`}>
        <img
          className="card-img-top"
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
      <div className="card-body">Add to favorite</div>
    </div>
  );
};

export default MovieCard;

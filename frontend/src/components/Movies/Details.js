import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import httpClient from '../../shared/httpClient';
import routes from '../../routes/index';

const MovieDetails = ({ user }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchMovieDetails = async () => {
      try {
        const response = await httpClient.get(routes.movies.search({ i: id }), {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setMovieDetails(response.data);
      } catch (error) {
        setErrorMessage(error);
      }
    };
    fetchMovieDetails();
    setIsLoading(false);

    return () => abortController.abort();
  }, [id]);

  return (
    <div className="movie-details mt-4 mb-4">
      {isLoading && <div className="lds-dual-ring" />}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {!isLoading && (
        <div className="row">
          <div className="col-md-4">
            <img
              className="card-img-top h-50"
              style={{ objectFit: 'cover' }}
              src={
                movieDetails?.poster === 'N/A'
                  ? 'https://placehold.it/198x264&text=Image+Not+Found'
                  : movieDetails?.poster
              }
              alt=""
            />
          </div>
          <div className="col-md-8">
            <h5 className="card-title">{movieDetails?.title}</h5>
            <p className="card-text">
              <b>Plot: </b>
              {movieDetails?.plot}
            </p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Type: {movieDetails?.type}</li>
              <li className="list-group-item">Year: {movieDetails?.year}</li>
              <li className="list-group-item">Runtime: {movieDetails?.runtime}</li>
              <li className="list-group-item">Released: {movieDetails?.released}</li>
              <li className="list-group-item">Genre: {movieDetails?.genre}</li>
              <li className="list-group-item">Language: {movieDetails?.language}</li>
              <li className="list-group-item">Country: {movieDetails?.country}</li>
              <li className="list-group-item">Director: {movieDetails?.director}</li>
              <li className="list-group-item">IMDB Rating: {movieDetails?.imdbRating}</li>
              <li className="list-group-item">IMDB Votes: {movieDetails?.imdbVotes}</li>
              {movieDetails?.ratings.map(rating => (
                <li className="list-group-item" key={rating?.source}>
                  {rating?.source} Rating: {rating?.value}
                </li>
              ))}
              <li className="list-group-item">Language: {movieDetails?.language}</li>
              <li className="list-group-item">Actors: {movieDetails?.actors}</li>
              <li className="list-group-item">Awards: {movieDetails?.awards}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(MovieDetails);

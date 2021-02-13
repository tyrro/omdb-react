import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const API_KEY = 'ce762116';

const MovieDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
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
                movieDetails?.Poster === 'N/A'
                  ? 'https://placehold.it/198x264&text=Image+Not+Found'
                  : movieDetails?.Poster
              }
              alt=""
            />
          </div>
          <div className="col-md-8">
            <h5 className="card-title">{movieDetails?.Title}</h5>
            <p className="card-text">
              <b>Plot: </b>
              {movieDetails?.Plot}
            </p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Type: {movieDetails?.Type}</li>
              <li className="list-group-item">Year: {movieDetails?.Year}</li>
              <li className="list-group-item">Runtime: {movieDetails?.Runtime}</li>
              <li className="list-group-item">Genre: {movieDetails?.Genre}</li>
              <li className="list-group-item">Language: {movieDetails?.Language}</li>
              <li className="list-group-item">Country: {movieDetails?.Country}</li>
              <li className="list-group-item">Director: {movieDetails?.Director}</li>
              <li className="list-group-item">IMDB Rating: {movieDetails?.imdbRating}</li>
              {movieDetails?.Ratings.map(rating => (
                <li className="list-group-item" key={rating?.Source}>
                  {rating?.Source} Rating: {rating?.Value}
                </li>
              ))}
              <li className="list-group-item">Language: {movieDetails?.Language}</li>
              <li className="list-group-item">Actors: {movieDetails?.Actors}</li>
              <li className="list-group-item">Awards: {movieDetails?.Awards}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;

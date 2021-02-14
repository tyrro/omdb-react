import React from 'react';
import axios from 'axios';
import { mockStore, mount } from '../../setupTests';

import MovieCard from './Card';

describe('MovieCard', () => {
  const store = mockStore({ user: { accessToken: 'asdasd123' } });
  const props = {
    store,
    title: 'Pather Panchali',
    poster: 'random_image_link.com/pather_panchali',
    year: 1955,
    favorite: false,
    imdbId: 'imdb_id',
    fetchMoviesWithCurrentState: jest.fn(),
  };

  const wrapper = mount(<MovieCard {...props} />);

  test('shows the movie image in the card', () => {
    expect(wrapper.find('img').prop('src')).toEqual(props.poster);
  });

  test('shows add to favorite button if the movie is not yet favorite', () => {
    expect(wrapper.find('button').text()).toEqual('Add to Favorite');
  });
});

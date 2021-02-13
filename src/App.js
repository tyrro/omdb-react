import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MovieList from './components/Movies/List';
import MovieDetails from './components/Movies/Details';
import PageNotFound from './components/PageNotFound';

import store from './store';

import './stylesheets/index.scss';

const App = () => (
  <div className="omdb-app container-fluid">
    <Router>
      <Switch>
        <Route exact path="/(|movies)">
          <MovieList />
        </Route>
        <Route exact path="/movies/:id" render={props => <MovieDetails {...props} />} />
        <Route exact path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  </div>
);

const AppWithProvider = () => (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

export default AppWithProvider;

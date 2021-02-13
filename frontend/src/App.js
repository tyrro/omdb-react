import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';

import Login from './components/Users/Login';
import Signup from './components/Users/Signup';
import MovieList from './components/Movies/List';
import MovieDetails from './components/Movies/Details';
import PageNotFound from './components/PageNotFound';

import Navbar from './components/Navbar';

import store from './store';

import './stylesheets/index.scss';

const App = () => (
  <div className="omdb-app container-fluid">
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <PrivateRoute exact path="/(|movies)">
          <MovieList />
        </PrivateRoute>
        <PrivateRoute exact path="/movies/:id" render={props => <MovieDetails {...props} />} />
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

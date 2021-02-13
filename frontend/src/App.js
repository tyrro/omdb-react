import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';

import Login from './components/Users/Login';
import Signup from './components/Users/Signup';
import MovieList from './components/Movies/List';
import MovieDetails from './components/Movies/Details';
import FavoriteList from './components/Users/Favorites';
import PageNotFound from './components/PageNotFound';

import Navbar from './components/Navbar';

import { persistor, store } from './configureStore';

import './stylesheets/index.scss';

const App = () => (
  <div className="omdb-app">
    <Router>
      <Navbar />
      <div className="container-fluid">
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
          <PrivateRoute exact path="/movies/:id">
            <MovieDetails />
          </PrivateRoute>
          <PrivateRoute exact path="/favorites">
            <FavoriteList />
          </PrivateRoute>
          <Route exact path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  </div>
);

const AppWithProvider = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

export default AppWithProvider;

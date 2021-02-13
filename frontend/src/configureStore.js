import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store;
if (process.env.NODE_ENV === 'development') {
  store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk, logger)));
} else {
  store = createStore(persistedReducer, applyMiddleware(thunk));
}
const persistor = persistStore(store);

export { persistor, store };

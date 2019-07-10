// @flow
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import counter from './counter';
import AppReducer from './AppReducer';
import ImageReducer from './ImageReducer';
import TypeToolReducer from './TypeToolReducer';

const CounterReducerPersistConfig = {
  key: 'counter',
  storage,
};

const CounterPersistedReducer = persistReducer(CounterReducerPersistConfig, counter);

export default combineReducers({
  counter: CounterPersistedReducer,
  AppReducer,
  ImageReducer,
  TypeToolReducer
});

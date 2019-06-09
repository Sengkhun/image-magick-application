// @flow
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import counter from './counter';
import AppReducer from './AppReducer';
import ImageReducer from './ImageReducer';

const ImageReducerPersistConfig = {
  key: 'image',
  storage,
};

const ImagePersistedReducer = persistReducer(ImageReducerPersistConfig, ImageReducer);

export default combineReducers({
  counter,
  AppReducer,
  ImageReducer: ImagePersistedReducer
});

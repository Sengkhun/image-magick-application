// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import {
  replayActionMain,
  replayActionRenderer
} from 'electron-redux';
import rootReducer from '../_reducers';
import type { counterStateType } from '../_reducers/counter';

const history = createMemoryHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState?: counterStateType, scope = 'main') {
  const store = createStore(rootReducer, initialState, enhancer);

  if (scope === 'main') {
    replayActionMain(store);
  } else {
    replayActionRenderer(store);
  }

  return store;
}

export default { configureStore, history };

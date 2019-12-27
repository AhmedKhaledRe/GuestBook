import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import { messegeReducer, selectedMessegeReducer } from './messege-reducer';
import { authReducer } from './auth-reducers';
import { reducer as formReducer } from 'redux-form';

export const init = () => {
  const reducer = combineReducers({
    messeges: messegeReducer,
    messege: selectedMessegeReducer,
    form: formReducer,
    auth: authReducer,
  });

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

  return store;
}

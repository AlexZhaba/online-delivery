import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import Menus from './reducers/Menus';
import User from './reducers/User';

const reducers = combineReducers({
  Menus,
  User
})



const store = createStore(reducers, applyMiddleware(thunk));

export default store;

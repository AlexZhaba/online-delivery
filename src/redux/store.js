import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import Menus from './reducers/Menus';
import User from './reducers/User';
import Order from './reducers/Order';
import Modals from './reducers/Modals';

const reducers = combineReducers({
  Menus,
  User,
  Modals,
  Order,
})



const store = createStore(reducers, applyMiddleware(thunk));

export default store;

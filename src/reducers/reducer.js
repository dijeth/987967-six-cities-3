import {combineReducers} from 'redux';
import dataReducer from './data/reducer.js';
import appReducer from './app/reducer.js';
import NameSpace from './name-space.js';

export default combineReducers({
  [NameSpace.DATA]: dataReducer,
  [NameSpace.APP]: appReducer
});

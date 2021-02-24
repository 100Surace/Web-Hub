import { combineReducers } from 'redux';
import modules from './modules';
import moduleCategory from './moduleCategory';

const reducers = combineReducers({
  modules,
  moduleCategory
});
export default reducers;

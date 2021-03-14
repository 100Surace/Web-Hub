import { combineReducers } from 'redux';
import modules from './modules';
import moduleCategory from './moduleCategory';
import dataTable from './dataTable';

const reducers = combineReducers({
  modules,
  moduleCategory,
  dataTable
});
export default reducers;

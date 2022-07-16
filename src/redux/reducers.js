import { combineReducers } from 'redux';
import ApiResponseReducer from './modules/ApiResponseReducer';
import LoaderReducer from './modules/LoaderReducer';

export default function createReducer() {
  const rootReducer = combineReducers({
    apiResponseReducer: ApiResponseReducer,
    loaderReducer: LoaderReducer,
  });

  return rootReducer;
}

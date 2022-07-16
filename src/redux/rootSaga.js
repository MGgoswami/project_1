import { select, put, takeLatest, all } from 'redux-saga/effects';
import { getReq } from 'src/helpers/request';



function* getApiResponse() {
  const { data, date, page } = yield select(state => state.apiResponseReducer);
  yield put({ type: 'SET_IS_LOADING', payload: (true) });
  const response = yield getReq(`https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&page=${page}`);
  try {
    if (response.status) {
      if (page > 1) {
        yield put({
          type: 'GET_API_RESPONSE', payload: { data: [...data, ...response.data.items] }
        });
      }
      else {
        yield put({
          type: 'GET_API_RESPONSE', payload: { data: [...response.data.items] }
        });
      }
    }
    else {
      console.log(response);
    }
    yield put({ type: 'SET_IS_LOADING', payload: (false) });
  } catch (e) {
    console.log(e);
    yield put({ type: 'SET_IS_LOADING', payload: (false) });
  }
}



/**Action Watcher*/
function* actionWatcher() {
  yield takeLatest('SET_API_RESPONSE', getApiResponse);
}



export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
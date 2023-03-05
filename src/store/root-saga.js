import {all, call} from 'redux-saga/effects'
import {categoriesSaga } from './categories/category.saga'

function* rootSaga(){
  yield all([call(categoriesSaga)])
}

export default rootSaga
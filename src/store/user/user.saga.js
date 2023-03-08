import {all, call, takeLatest, put} from 'redux-saga/effects'
import USER_ACTION_TYPES from './user.types'
import {signInSuccess, signInFailure} from './user.action'
import { getCurrentUser, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import { onAuthStateChanged } from 'firebase/auth'

export function* getSnapshotFromUserAuth(userAuth, additionalDetails){
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails)
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* isUserAuthenticated(){
    try {
        const userAuth = yield call(getCurrentUser)
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onAuthStateChangedListener(userAuth, callback){
    yield onAuthStateChanged(userAuth, callback)
}

export function* onCheckUserSession(){
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* userSagas(){
    yield all([call(onCheckUserSession)]);
}
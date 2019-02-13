import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_FOCUS_HOP" actions
function* fetchFocusHop(action) {
    try {
        const response = yield axios.get(`api/hops/${action.payload}`);
        yield put({ type: 'SET_FOCUS_HOP', payload: response.data[0] });
    } catch (error) {
        const errorMessage = `Unable to fetch focus hop variety from server. ${error}`;
        console.log(errorMessage);
        alert(errorMessage);
    }
}


function* focusHopSaga() {
    yield takeLatest('FETCH_FOCUS_HOP', fetchFocusHop);
}

export default focusHopSaga;

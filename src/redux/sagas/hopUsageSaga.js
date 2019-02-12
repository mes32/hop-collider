import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_HOP_USAGE" actions
function* fetchHopUsage() {
    try {
        const response = yield axios.get('api/brewing_role');
        yield put({ type: 'SET_HOP_USAGE', payload: response.data });
    } catch (error) {
        const errorMessage = `Unable to fetch hop usage from server, ${error}`;
        console.log(errorMessage);
        alert(errorMessage);
    }
}

function* hopUsageSaga() {
    yield takeLatest('FETCH_HOP_USAGE', fetchHopUsage);
}

export default hopUsageSaga;

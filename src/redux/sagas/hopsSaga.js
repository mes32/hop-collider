import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_HOPS" actions
function* fetchHops() {
    try {
        const hopsResponse = yield axios.get('api/hops');
        yield put({ type: 'SET_HOPS', payload: hopsResponse.data });
        const countriesResponse = yield axios.get('api/country');
        yield put({ type: 'SET_COUNTRIES', payload: countriesResponse.data });
        // const hopsUsageResponse = yield axios.get('api/hop_usage');
        // yield put({ type: 'SET_HOP_USAGE', payload: hopsUsageResponse.data });
    } catch (error) {
        const errorMessage = `Unable to fetch hops from server, ${error}`;
        console.log(errorMessage);
        alert(errorMessage);
    }
}

// worker Saga: will be fired on "DELETE_HOP" actions
function* deleteHop(action) {
    try {
        yield axios.delete(`/api/hops/${action.payload.id}`);
        yield put({ type: 'FETCH_HOPS' });
    } catch (error) {
        const errorMessage = `Error unable to delete hop, ${error}`;
        console.log(errorMessage);
        alert(errorMessage);
    }
}

function* hopsSaga() {
    yield takeLatest('FETCH_HOPS', fetchHops);
    yield takeLatest('DELETE_HOP', deleteHop);
}

export default hopsSaga;

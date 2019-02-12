import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_HOPS" actions
function* fetchHops() {
    try {
        const hopsResponse = yield axios.get('api/hops');
        yield put({ type: 'SET_HOPS', payload: hopsResponse.data });
    } catch (error) {
        const errorMessage = `Unable to fetch hops from server. ${error}`;
        console.log(errorMessage);
        alert(errorMessage);
    }
}

function* addHop(action) {
    try {
        yield axios.post('api/hops', action.payload);
        yield put({ type: 'FETCH_HOPS' });
    } catch (error) {
        const errorMessage = `Unable to add hop to server. ${error}`;
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
        const errorMessage = `Unable to delete hop. ${error}`;
        console.log(errorMessage);
        alert(errorMessage);
    }
}

function* hopsSaga() {
    yield takeLatest('FETCH_HOPS', fetchHops);
    yield takeLatest('ADD_HOP', addHop);
    yield takeLatest('DELETE_HOP', deleteHop);
}

export default hopsSaga;

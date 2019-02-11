import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_HOPS" actions
function* fetchHops() {
    try {
        // const config = {
        //     headers: { 'Content-Type': 'application/json' },
        //     withCredentials: true,
        // };

        const response = yield axios.get('api/hops');
        yield put({ type: 'SET_HOPS', payload: response.data });
    } catch (error) {
        const errorMessage = `Unable to fetch hops from server, ${error}`;
        console.log(errorMessage);
        alert(errorMessage);
    }
}

function* hopsSaga() {
    yield takeLatest('FETCH_HOPS', fetchHops);
}

export default hopsSaga;

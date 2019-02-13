import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_COUNTRIES" actions
function* fetchCountries() {
    try {
        const response = yield axios.get('api/country');
        yield put({ type: 'SET_COUNTRIES', payload: response.data });
    } catch (error) {
        const errorMessage = `Unable to fetch countries from server, ${error}`;
        console.log(errorMessage);
        alert(errorMessage);
    }
}

function* hopUsageSaga() {
    yield takeLatest('FETCH_COUNTRIES', fetchCountries);
}

export default hopUsageSaga;

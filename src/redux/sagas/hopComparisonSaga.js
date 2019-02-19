import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'SAVE_HOP_COMPARISON' actions
function* saveHopComparison(action) {
    try {
        yield axios.post('api/hop_comparison', action.payload);
    } catch (error) {
        const errorMessage = `Unable to save hop comparison on server. ${error}`;
        console.log(errorMessage);
        alert(errorMessage);
    }
}

// worker Saga: will be fired on 'LOAD_HOP_COMPARISON' actions
function* loadHopComparison() {
    try {
        // const response = yield axios.get('api/hops');
        // yield put({ type: 'SET_HOPS', payload: response.data });
    } catch (error) {
        const errorMessage = `Unable to load hop comparison from server. ${error}`;
        console.log(errorMessage);
        alert(errorMessage);
    }
}

function* hopComparisonSaga() {
    yield takeLatest('SAVE_HOP_COMPARISON', saveHopComparison);
    yield takeLatest('LOAD_HOP_COMPARISON', loadHopComparison);
}

export default hopComparisonSaga;

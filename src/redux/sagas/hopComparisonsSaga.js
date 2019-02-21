import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on 'SAVE_HOP_COMPARISON' actions
function* saveHopComparisons(action) {
    try {
        yield axios.post('api/hop_comparison', action.payload);
    } catch (error) {
        const errorMessage = `Unable to save hop comparison on server. ${error}`;
        console.log(errorMessage);
        alert(errorMessage);
    }
}

// worker Saga: will be fired on 'LOAD_HOP_COMPARISON' actions
// function* loadHopComparisons() {
//     try {
//         const response = yield axios.get('api/hops');
//         yield put({ type: 'SET_HOPS', payload: response.data });
//     } catch (error) {
//         const errorMessage = `Unable to load hop comparison from server. ${error}`;
//         console.log(errorMessage);
//         alert(errorMessage);
//     }
// }

function* fetchHopComparisons() {
    try {
        const response = yield axios.get('api/hop_comparison');
        yield put({ type: 'SET_HOP_COMPARISONS', payload: response.data });
    } catch (error) {
        const errorMessage = `Unable to fetch hop comparisons from server. ${error}`;
        console.log(errorMessage);
        alert(errorMessage);
    }
}

function* hopComparisonSaga() {
    yield takeLatest('SAVE_HOP_COMPARISON', saveHopComparisons);
    // yield takeLatest('LOAD_HOP_COMPARISON', loadHopComparisons);
    yield takeLatest('FETCH_HOP_COMPARISONS', fetchHopComparisons);
}

export default hopComparisonSaga;

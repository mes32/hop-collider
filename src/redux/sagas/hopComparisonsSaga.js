import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import Swal from 'sweetalert2';

const showSaveSuccess = () => {
    Swal.fire({
        type: 'success',
        title: 'Hop analysis saved!',
        showConfirmButton: true,
        confirmButtonColor: '#587b7f',
    });
};

const showSaveError = (error) => {
    Swal.fire({
        type: 'error',
        title: 'Unable to save analysis.',
        showConfirmButton: true,
        confirmButtonColor: '#587b7f',
    });
    console.log(`Unable to save hop comparison on server. ${error}`);
}

// worker Saga: will be fired on 'SAVE_HOP_COMPARISON' actions
function* saveHopComparison(action) {
    try {
        yield axios.post('api/hop_comparison', action.payload);
        yield put({ type: 'FETCH_HOP_COMPARISONS' });
        yield showSaveSuccess();
    } catch (error) {
        yield showSaveError(error);
    }
}

// worker Saga: will be fired on 'LOAD_HOP_COMPARISON' actions
function* loadHopComparison(action) {
    try {
        const response = yield axios.get(`api/hop_comparison/${action.payload.id}`);
        yield put({ type: 'RESET_SELECTED_HOPS' });
        for (let hop of response.data) {
            const action = {
                type: 'ADD_SELECTED_HOP',
                payload: hop
            }
            yield put(action);
        }
    } catch (error) {
        const errorMessage = `Unable to load hop comparison. ${error}`;
        console.log(errorMessage);
        alert(errorMessage);
    }
}

function* deleteHopComparison(action) {
    try {
        const id = action.payload.id;
        const hops = action.payload.hops;
        console.log(`id: ${id}`);
        console.log(`hops: ${hops}`);
        yield axios.delete(`api/hop_comparison/${action.payload.id}`, { data: { hops: hops } });
        yield put({ type: 'FETCH_HOP_COMPARISONS' });
    } catch (error) {
        const errorMessage = `Unable to delete comparison from server. ${error}`;
        console.log(errorMessage);
        alert(errorMessage);
    }
}

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
    yield takeLatest('SAVE_HOP_COMPARISON', saveHopComparison);
    yield takeLatest('LOAD_HOP_COMPARISON', loadHopComparison);
    yield takeLatest('DELETE_HOP_COMPARISON', deleteHopComparison);
    yield takeLatest('FETCH_HOP_COMPARISONS', fetchHopComparisons);
}

export default hopComparisonSaga;

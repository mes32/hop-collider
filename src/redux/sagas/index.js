import { all } from 'redux-saga/effects';

import countriesSaga from './countriesSaga';
import focusHopSaga from './focusHopSaga';
import hopComparisonsSaga from './hopComparisonsSaga';
import hopUsageSaga from './hopUsageSaga';
import hopsSaga from './hopsSaga';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    countriesSaga(),
    focusHopSaga(),
    hopComparisonsSaga(),
    hopUsageSaga(),
    hopsSaga(),
    loginSaga(),
    registrationSaga(),
    userSaga(),
  ]);
}

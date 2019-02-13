import { combineReducers } from 'redux';
import countries from './countriesReducer';
import focusHop from './focusHopReducer';
import errors from './errorsReducer';
import hopUsage from './hopUsageReducer';
import hops from './hopsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  countries,
  focusHop,
  errors, // contains registrationMessage and loginMessage
  hopUsage,
  hops, // An array of all hops in the server-side database
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
});

export default rootReducer;

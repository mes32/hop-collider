const DEFAULT_STATE = {};

const focusHop = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'SET_FOCUS_HOP':
            return action.payload;
        default:
            return state;
    }
};

export default focusHop;

const defaultState = [];

const countries = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_COUNTRIES':
            return action.payload;
        default:
            return state;
    }
};

export default countries;
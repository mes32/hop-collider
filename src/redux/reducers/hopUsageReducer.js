const defaultState = [];

const hopUsage = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_HOP_USAGE':
            return action.payload;
        default:
            return state;
    }
};

export default hopUsage;
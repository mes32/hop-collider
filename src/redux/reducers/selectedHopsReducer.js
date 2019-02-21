const defaultState = [];

const selectedHops = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_SELECTED_HOP':
            const hopToAdd = action.payload;
            return [...state, hopToAdd];
        case 'REMOVE_SELECTED_HOP':
            const hopToRemove = action.payload;
            return state.filter(hop => hop !== hopToRemove);
        case 'RESET_SELECTED_HOPS':
            return defaultState;
        default:
            return state;
    }
};

export default selectedHops;

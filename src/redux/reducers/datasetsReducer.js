import HopCompoundDataset from '../../modules/HopCompoundDataset/HopCompoundDataset';

const defaultState = {
    hops: [],
    selectedHops: [],
    alphaAcidData: new HopCompoundDataset('alpha_acid', [], []),
};

const datasets = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_HOPS':
            const newHops = action.payload;
            if (newHops !== state.hops) {
                return {
                    hops: newHops,
                    selectedHops: state.selectedHops,
                    alphaAcidData: new HopCompoundDataset('alpha_acid', newHops, state.selectedHops),
                    // betaAcidData: new HopCompoundDataset('beta_acid', this.props.reduxStore.hops, []),
                    // cohumuloneData: new HopCompoundDataset('cohumulone', this.props.reduxStore.hops, [])
                };
            } else {
                return state;
            }
        case 'ADD_SELECTED_HOP':
            const hopToAdd = action.payload;
            const appendedHops = [...state.selectedHops, hopToAdd];
            return {
                hops: state.hops,
                selectedHops: appendedHops,
                alphaAcidData: new HopCompoundDataset('alpha_acid', state.hops, appendedHops),
            };
        case 'REMOVE_SELECTED_HOP':
            const hopToRemove = action.payload;
            const filteredHops = state.selectedHops.filter(hop => hop !== hopToRemove);
            return {
                hops: state.hops,
                selectedHops: filteredHops,
                alphaAcidData: new HopCompoundDataset('alpha_acid', state.hops, filteredHops),
            };
        case 'RESET_SELECTED_HOPS':
            return {
                hops: state.hops,
                selectedHops: [],
                alphaAcidData: new HopCompoundDataset('alpha_acid', state.hops, []),
            };
        default:
            return state;
    }
};

export default datasets;

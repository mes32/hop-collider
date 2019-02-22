import HopCompoundDataset from '../../modules/HopCompoundDataset/HopCompoundDataset';

const defaultState = {
    hops: [],
    selectedHops: [],
    alphaAcid: new HopCompoundDataset('alpha_acid', [], []),
    betaAcid: new HopCompoundDataset('beta_acid', [], []),
    cohumulone: new HopCompoundDataset('cohumulone', [], []),
    total_oil: new HopCompoundDataset('total_oil', [], []),
    myrcene: new HopCompoundDataset('myrcene', [], []),
    humulene: new HopCompoundDataset('humulene', [], []),
    caryophyllene: new HopCompoundDataset('caryophyllene', [], []),
    farnesene: new HopCompoundDataset('farnesene', [], []),
};

const datasets = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_HOPS':
            const newHops = action.payload;
            if (newHops !== state.hops) {
                return {
                    hops: newHops,
                    selectedHops: state.selectedHops,
                    alphaAcid: new HopCompoundDataset('alpha_acid', newHops, state.selectedHops),
                    betaAcid: new HopCompoundDataset('beta_acid', newHops, state.selectedHops),
                    cohumulone: new HopCompoundDataset('cohumulone', newHops, state.selectedHops),
                    total_oil: new HopCompoundDataset('total_oil', newHops, state.selectedHops),
                    myrcene: new HopCompoundDataset('myrcene', newHops, state.selectedHops),
                    humulene: new HopCompoundDataset('humulene', newHops, state.selectedHops),
                    caryophyllene: new HopCompoundDataset('caryophyllene', newHops, state.selectedHops),
                    farnesene: new HopCompoundDataset('farnesene', newHops, state.selectedHops),
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
                alphaAcid: new HopCompoundDataset('alpha_acid', state.hops, appendedHops),
                betaAcid: new HopCompoundDataset('beta_acid', state.hops, appendedHops),
                cohumulone: new HopCompoundDataset('cohumulone', state.hops, appendedHops),
                total_oil: new HopCompoundDataset('total_oil', state.hops, appendedHops),
                myrcene: new HopCompoundDataset('myrcene', state.hops, appendedHops),
                humulene: new HopCompoundDataset('humulene', state.hops, appendedHops),
                caryophyllene: new HopCompoundDataset('caryophyllene', state.hops, appendedHops),
                farnesene: new HopCompoundDataset('farnesene', state.hops, appendedHops),
            };
        case 'REMOVE_SELECTED_HOP':
            const hopToRemove = action.payload;
            const filteredHops = state.selectedHops.filter(hop => hop !== hopToRemove);
            return {
                hops: state.hops,
                selectedHops: filteredHops,
                alphaAcid: new HopCompoundDataset('alpha_acid', state.hops, filteredHops),
                betaAcid: new HopCompoundDataset('beta_acid', state.hops, filteredHops),
                cohumulone: new HopCompoundDataset('cohumulone', state.hops, filteredHops),
                total_oil: new HopCompoundDataset('total_oil', state.hops, filteredHops),
                myrcene: new HopCompoundDataset('myrcene', state.hops, filteredHops),
                humulene: new HopCompoundDataset('humulene', state.hops, filteredHops),
                caryophyllene: new HopCompoundDataset('caryophyllene', state.hops, filteredHops),
                farnesene: new HopCompoundDataset('farnesene', state.hops, filteredHops),
            };
        case 'RESET_SELECTED_HOPS':
            return {
                hops: state.hops,
                selectedHops: [],
                alphaAcid: new HopCompoundDataset('alpha_acid', state.hops, []),
                betaAcid: new HopCompoundDataset('beta_acid', state.hops, []),
                cohumulone: new HopCompoundDataset('cohumulone', state.hops, []),
                total_oil: new HopCompoundDataset('total_oil', state.hops, []),
                myrcene: new HopCompoundDataset('myrcene', state.hops, []),
                humulene: new HopCompoundDataset('humulene', state.hops, []),
                caryophyllene: new HopCompoundDataset('caryophyllene', state.hops, []),
                farnesene: new HopCompoundDataset('farnesene', state.hops, []),
            };
        default:
            return state;
    }
};

export default datasets;

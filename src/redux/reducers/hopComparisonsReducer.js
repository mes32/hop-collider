const defaultState = [];

const hopComparisons = (state = defaultState, action) => {
    if (action.type === 'SET_HOP_COMPARISONS') {
        let newComparisons = [];
        for (let row of action.payload) {
            let foundExisting = false;
            for (let comparison of newComparisons) {
                if (comparison.id === row.id) {
                    foundExisting = true;
                    const newHop = {
                        hop_id: row.hops_id,
                        variety_name: row.variety_name
                    };
                    comparison.hops.push(newHop);
                    break;
                }
            }
            if (!foundExisting) {
                const newHop = {
                    hop_id: row.hops_id,
                    variety_name: row.variety_name
                };
                const newEntry = {
                    id: row.id,
                    created_at: row.created_at,
                    hops: [newHop]
                };
                newComparisons = [...newComparisons, newEntry];
            }
        }
        return newComparisons;
    } else {
        return state;
    }
};

export default hopComparisons;

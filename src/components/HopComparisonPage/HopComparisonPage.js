import React, { Component } from 'react';
import { connect } from 'react-redux';

import HopCompoundChart from '../HopCompoundChart/HopCompoundChart';

class HopComparisonPage extends Component {
    componentDidMount() {
        const action = { type: 'FETCH_HOPS' };
        this.props.dispatch(action);
    }

    selectHop = (event) => {
        const id = event.target.value;
        if (id === '') {
            // clear plots
        } else {
            const action = { type: 'FETCH_FOCUS_HOP', payload: id };
            this.props.dispatch(action);
        }
    }

    render() {
        return (
            <div>
                <h2>Hop Comparison</h2>
                <select onChange={this.selectHop} defaultValue="">
                    <option value="">-- Select a Hop --</option>
                    {this.props.reduxStore.hops.map(
                        (hop) => <option key={hop.id} value={hop.id}>{hop.variety_name} ({hop.country})</option>
                    )}
                </select>
                <HopCompoundChart hops={this.props.reduxStore.hops} />
            </div>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({ reduxStore });
export default connect(mapReduxStoreToProps)(HopComparisonPage);
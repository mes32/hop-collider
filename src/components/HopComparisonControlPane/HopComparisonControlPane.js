import React, { Component } from 'react';
import { connect } from 'react-redux';

class HopComparisonControlPane extends Component {

    selectHop = (event) => {
        this.props.selectHop(event.target.value);
    }

    render() {
        return (
            <div className="control-pane">
                <select onChange={this.selectHop} defaultValue="">
                    <option value="">-- Select a Hop --</option>
                    {this.props.reduxStore.hops.map(
                        (hop) => <option key={hop.id} value={hop.id}>{hop.variety_name} ({hop.country})</option>
                    )}
                </select>
            </div>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({ reduxStore });
export default connect(mapReduxStoreToProps)(HopComparisonControlPane);
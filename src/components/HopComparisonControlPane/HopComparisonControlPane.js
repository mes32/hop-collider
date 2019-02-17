import React, { Component } from 'react';

import ControlPaneList from './ControlPaneList/ControlPaneList';

class HopComparisonControlPane extends Component {

    selectHop = (event) => {
        this.props.selectHop(event.target.value);
    }

    render() {
        return (
            <div className="control-pane">
                <select onChange={this.selectHop} defaultValue="">
                    <option value="">-- Select a Hop --</option>
                    {this.props.hops.map(
                        (hop) => <option key={hop.id} value={hop.id}>{hop.variety_name} ({hop.country})</option>
                    )}
                </select>
                <ControlPaneList hops={this.props.hops} />
            </div>
        );
    }
}

export default HopComparisonControlPane;
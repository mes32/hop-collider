import React, { Component } from 'react';

import ControlPaneList from './ControlPaneList/ControlPaneList';

class HopComparisonControlPane extends Component {

    selectHop = (event) => {
        this.props.selectHop(event.target.value);
    }

    render() {
        return (
            <div className="control-pane">
                <ControlPaneList hops={this.props.hops} addHop={this.props.addHop} />
            </div>
        );
    }
}

export default HopComparisonControlPane;
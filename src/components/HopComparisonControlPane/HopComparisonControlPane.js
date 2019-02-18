import React, { Component } from 'react';

import ControlPaneFilter from './ControlPaneFilter/ControlPaneFilter';
import ControlPaneList from './ControlPaneList/ControlPaneList';
import ControlPaneSearch from './ControlPaneSearch/ControlPaneSearch';

class HopComparisonControlPane extends Component {

    selectHop = (event) => {
        this.props.selectHop(event.target.value);
    }

    render() {
        return (
            <div className="control-pane">
                <ControlPaneSearch />
                <ControlPaneFilter />
                <ControlPaneList hops={this.props.hops} selectedHops={this.props.selectedHops} addHop={this.props.addHop} />
            </div>
        );
    }
}

export default HopComparisonControlPane;
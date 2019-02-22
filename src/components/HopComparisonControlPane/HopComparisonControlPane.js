import React, { Component } from 'react';

import ControlPaneFilter from './ControlPaneFilter/ControlPaneFilter';
import ControlPaneList from './ControlPaneList/ControlPaneList';
import ControlPaneSearch from './ControlPaneSearch/ControlPaneSearch';

class HopComparisonControlPane extends Component {
    render() {
        return (
            <div className="control-pane">
                <ControlPaneSearch />
                <ControlPaneFilter />
                <ControlPaneList />
            </div>
        );
    }
}

export default HopComparisonControlPane;
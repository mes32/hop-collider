import React from 'react';

import ControlPaneFilter from './ControlPaneFilter/ControlPaneFilter';
import ControlPaneList from './ControlPaneList/ControlPaneList';
import ControlPaneSearch from './ControlPaneSearch/ControlPaneSearch';

// This is the control pane shown on the right side of the HopComparisonPage
const HopComparisonControlPane = () =>(
    <div className="control-pane">
        <ControlPaneSearch />
        <ControlPaneFilter />
        <ControlPaneList />
    </div>
);

export default HopComparisonControlPane;
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ControlPaneList.css';
import ControlPaneRow from './ControlPaneRow/ControlPaneRow';

// Lists a number of hops which can be selected and added to the analysis.
const ControlPaneList = (props) => (
    <div>
        <div className="hop-list-div">
            <table className="hop-list-table">
                <tbody>
                    {props.hops.map(
                        hop => <ControlPaneRow key={hop.id} hop={hop} />
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

// Note: This blog post was useful for learning how to do this for state-less 
// components.
// https://medium.com/hootsuite-engineering/stateless-components-with-react-f38f8a888e6e
const mapReduxStoreToProps = (reduxStore) => {
    return {
        hops: reduxStore.hops
    };
};
export default connect(mapReduxStoreToProps)(ControlPaneList);
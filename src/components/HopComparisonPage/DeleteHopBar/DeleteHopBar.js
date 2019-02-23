import React, { Component } from 'react';
import { connect } from 'react-redux';

import './DeleteHopBar.css';

const SELECTED_COLORS = [
    'rgba(0, 84, 165)',
    'rgba(243, 101, 35)',
    'rgba(0, 166, 82)',
    'rgba(146, 39, 143)',
    'rgba(46, 49, 146)',
    'rgba(255, 148, 0)',
    'rgba(1, 168, 158)',
    'rgba(238, 28, 37)',
    'rgba(141, 199, 1)',
    'rgba(102, 46, 145)',
    'rgba(255, 197, 1)'
];

// This is a div found at the bottom of the hop analysis charts that lists a 
// button for each hop in the analysis. Pressing a button will remove a hop from
// the analysis.
class DeleteHopBar extends Component {

    // When a button is pressed send a request to the database to remove the 
    // current hop.
    removeHop = (hop) => {
        const action = {
            type: 'REMOVE_SELECTED_HOP',
            payload: hop
        };
        this.props.dispatch(action);
    }

    // Find the corresponding button color in the array
    getButtonColor = (index) => {
        return {
            backgroundColor: SELECTED_COLORS[index % SELECTED_COLORS.length],
        };
    }

    // Show this component on the DOM
    render() {
        return (
            <div className="delete-hop-bar">
                {this.props.reduxStore.selectedHops.map((hop, i) => 
                    <button key={hop.id} onClick={this.removeHop.bind(this, hop)} style={this.getButtonColor(i)} >
                        {hop.variety_name} ✗
                    </button>
                )}
            </div>
        )
    }
}

const mapReduxStoreToProps = (reduxStore) => ({ reduxStore });
export default connect(mapReduxStoreToProps)(DeleteHopBar);
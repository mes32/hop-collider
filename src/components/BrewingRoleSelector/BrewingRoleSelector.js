import React, { Component } from 'react';
import { connect } from 'react-redux';

// A drop down menu that allows the user to select the brewing role for a hop
class BrewingRoleSelector extends Component {

    // When this component mounts dispatch a request to the server for a list of 
    // ways hops can be used in brewing.
    componentDidMount() {
        const action = { type: 'FETCH_HOP_USAGE' };
        this.props.dispatch(action);
    }

    // Select the style of usage (i.e. brewing role) for this hop
    selected = (event) => {
        this.props.setBrewingRole(event.target.value);
    }

    // Show this component on the DOM
    render() {
        return (
            <select onChange={this.selected} value={this.props.value}>
                <option value="" disabled hidden>( Select a Brewing Role )</option>
                {this.props.reduxStore.hopUsage.map(
                    (usage) => <option key={usage.id} value={usage.id}>{usage.description}</option>
                )}
            </select>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({ reduxStore });
export default connect(mapReduxStoreToProps)(BrewingRoleSelector);
import React, { Component } from 'react';
import { connect } from 'react-redux';

class BrewingRoleSelector extends Component {

    componentDidMount() {
        const action = { type: 'FETCH_HOP_USAGE' };
        this.props.dispatch(action);
    }

    selected = (event) => {
        this.props.setBrewingRole(event.target.value);
    }

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
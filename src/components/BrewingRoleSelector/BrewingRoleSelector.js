import React, { Component } from 'react';
import { connect } from 'react-redux';

class BrewingRoleSelector extends Component {

    componentDidMount() {
        // const action = { type: 'FETCH_TAGS' };
        // this.props.dispatch(action);
    }

    selected = (event) => {
        this.props.setBrewingRole(event.target.value);
    }

    render() {
        return (
            <select onChange={this.selected} defaultValue="" required>
                <option value="" disabled hidden>( Select a Brewing Role )</option>
                {/* {this.props.reduxStore.tags.map(
                    (tag) => <option key={tag.id} value={tag.id}>{tag.name}</option>
                )} */}
            </select>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({ reduxStore });
export default connect(mapReduxStoreToProps)(BrewingRoleSelector);
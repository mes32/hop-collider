import React, { Component } from 'react';
import { connect } from 'react-redux';

class ControlPaneRow extends Component {

    addHop = () => {
        const action = {
            type: 'ADD_SELECTED_HOP',
            payload: this.props.hop
        };
        this.props.dispatch(action);
    }

    getUniqueName = () => {
        const hop = this.props.hop;
        const hopArray = this.props.reduxStore.hops;

        const countNames = (count, element) => {
            if (element.variety_name === hop.variety_name) {
                return count + 1;
            } else {
                return count;
            }
        }
        
        const count = hopArray.reduce(countNames, 0);
        if (count > 1) {
            return `${hop.variety_name} (${hop.country})`;
        } else {
            return hop.variety_name;
        }
    }

    getDisabled = () => {
        if (this.props.reduxStore.selectedHops.includes(this.props.hop)) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <tr>
                <td>{this.getUniqueName()}</td>
                <td>
                    <button onClick={this.addHop} disabled={this.getDisabled()}>
                    add >
                    </button>
                </td>
            </tr>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({ reduxStore });
export default connect(mapReduxStoreToProps)(ControlPaneRow);
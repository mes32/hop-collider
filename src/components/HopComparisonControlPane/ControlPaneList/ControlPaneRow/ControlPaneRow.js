import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArrowIcon from '@material-ui/icons/ArrowRightAlt';

import './ControlPaneRow.css';

// One row in the list of hops on the ControlPaneList
class ControlPaneRow extends Component {

    // When the 'Add' button is pressed. Add the current hop to the list of hops
    // in the current analysis.
    addHop = () => {
        const action = {
            type: 'ADD_SELECTED_HOP',
            payload: this.props.hop
        };
        this.props.dispatch(action);
    }

    // Produces a unique name for the current hop. Adds the country of origin if
    // needed as a differentiating factor.
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

    // Sets this row's button to disabled if the hop is alread in the list of
    // hops in the current analysis.
    getDisabled = () => {
        for (let hop of this.props.reduxStore.selectedHops) {
            if (hop.id === this.props.hop.id) {
                return true;
            }
        }
        return false;
    }

    // Show this component on the DOM
    render() {
        return (
            <tr>
                <td className="control-pane-row">
                    <button onClick={this.addHop} disabled={this.getDisabled()} className="control-pane-include-hop">
                        {this.getUniqueName()}<ArrowIcon />
                    </button>
                </td>
            </tr>
        );
    }
}

const mapReduxStoreToProps = (reduxStore) => ({ reduxStore });
export default connect(mapReduxStoreToProps)(ControlPaneRow);
import React, { Component } from 'react';

class ControlPaneRow extends Component {

    addHop = () => {
        this.props.addHop(this.props.hop);
    }

    getUniqueName = () => {
        const hop = this.props.hop;
        const hopArray = this.props.hops;

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
        if (this.props.selectedHops.includes(this.props.hop)) {
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

export default ControlPaneRow;
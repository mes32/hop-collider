import React, { Component } from 'react';

class ControlPaneRow extends Component {

    addHop = () => {
        this.props.addHop(this.props.hop);
    }

    getUniqueName = (hop, hopArray) => {
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

    render() {
        return (
            <tr>
                <td>{this.getUniqueName(this.props.hop, this.props.hops)}</td>
                <td>
                    <button onClick={this.addHop}>
                    add >
                    </button>
                </td>
            </tr>
        );
    }
}

export default ControlPaneRow;
import React, { Component } from 'react';

class ControlPaneRow extends Component {

    addHop = () => {
        this.props.addHop(this.props.hop);
    }

    render() {
        return (
            <tr>
                <td>{this.props.hop.variety_name}</td>
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
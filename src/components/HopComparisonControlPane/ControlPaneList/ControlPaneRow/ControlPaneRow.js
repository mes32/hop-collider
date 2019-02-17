import React, { Component } from 'react';

class ControlPaneRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.hop.variety_name}</td>
                <td>add</td>
            </tr>
        );
    }
}

export default ControlPaneRow;
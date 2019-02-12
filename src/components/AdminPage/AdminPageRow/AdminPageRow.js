import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminPageRow extends Component {
    editHop = (event) => {
        console.log(`editHop() hop: ${JSON.stringify(this.props.hop.id)}`);
    }

    deleteHop = (event) => {
        console.log(`deleteHop() hop: ${JSON.stringify(this.props.hop.id)}`);
    }

    render() {
        const hop = this.props.hop;
        const aboutURL = `/hops/${hop.id}`;
        return (
            <tr>
                <td>{hop.id}</td>
                <td>{hop.variety_name}</td>
                <td>
                    <Link to={aboutURL}>
                        about
                    </Link>
                </td>
                <td>
                    <button onClick={this.editHop}>
                        edit
                    </button>
                </td>
                <td>
                    <button onClick={this.deleteHop}>
                        delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default AdminPageRow;